//- 系统库
import * as fs from 'fs'
import * as util from 'util'
import * as path from 'path'
import * as _ from 'lodash'
//- 工具库
import { _debug_util} from './debugUtil'
let getJSON = function (filepath) {
    filepath = filepath || path.join(__dirname, '../../common.json')
    
    let ret = _.attempt(function() {
        if (fs.existsSync(filepath)) {
            let buf = fs.readFileSync(filepath)
            if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
                buf = buf.slice(3);
            }
            let content = buf.toString('utf-8').replace(/\/\/(.*)/, ''); //过滤掉注释
            return  JSON.parse(content)
        } else {
            return new Error(`文件${filepath}不存在`);
        }
    })
    if (_.isError(ret)) {
        return null;
    }
    _debug_util(ret)
    return ret;
    /*let obj;
    try {
        _debug_util(filepath)
        if (fs.existsSync(filepath)) {
            let buf = fs.readFileSync(filepath)
            if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
                buf = buf.slice(3);
            }
            let content = buf.toString('utf-8').replace(/\/\/(.*)/, ''); //过滤掉注释
            //_debug_util(content.replace(/\{/g, '"\{"').replace(/\}/g, '"}"').replace('\n', '').replace('\s', '').replace('\b', ''))
            obj = JSON.parse(content)
            //_debug_util(obj)
        } else {
            throw Error(`文件${filepath}不存在`)
        }
    } catch (e) {
        _debug_util(e)
    } finally {
        return obj;
    }*/
}
let transform = function(obj) {
    if (!util.isObject(obj)) {
        return null
    }
    _.attempt(function() {
        let json = getJSON(null)
        if (json) {
            let map = json['house_table']
            for (let key in obj) {
                let val = obj[key]
                if (map[val]) {
                } else {
                    obj[key] = map[key]
                }
            }
        }
        return obj;
    })
    return obj;
    /*try {
        let json = getJSON(null)
        if (json) {
            let map = json['house_table']
            for (let key in obj) {
                let val = obj[key]
                if (map[val]) {
                    //_debug_util(map[val], obj[key], key)
                } else {
                    obj[key] = map[key]
                }
            }
        }
    } catch (e) {
        _debug_util(e)
    } finally {
        return obj;
    }*/
}
export {
    getJSON,
    transform
}
