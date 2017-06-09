//- 系统库
import * as fs from 'fs'
import * as path from 'path'
//- 第三方库
import * as _ from 'lodash'
//- util
import { _debug } from '../../utils/debugUtil'
import { getJSON } from '../../utils/jsonUtil'

//自动生成 index.ts文件

let func = async function() {
    let files = await new Promise(function(resolved, rejected) {
        fs.readdir(path.join(__dirname).replace('build', 'src'), function(err, files) {
            if (err) {
                rejected(err)
            } else {
                resolved(files)
            }
        })
    })
    // _debug(files)
    //1. 导入数据表结构
    const index_ts_file = path.join(__dirname, 'index.ts').replace('build', 'src');
    const index_js_file = path.join(__dirname, 'index.js');
    _debug(index_ts_file)
    fs.writeFileSync(index_ts_file, "import rent_db from '../../rent_db'\n");
    _debug(files)
    _.each(files, function(file){
        _debug(file)
        if (!_.includes(['auto.ts', 'index.ts'], file) && _.endsWith(file, '.ts')) {
            let ret = path.parse(path.join(__dirname, file));
            let fileName = ret.name;
            let mod = _.capitalize(fileName)
            _debug(`fileName: ${fileName} module: ${mod} index_ts_file: ${index_ts_file}`)
            fs.appendFileSync(index_ts_file, `import ${mod} from './${fileName}'\n`)
        }
    })
    //2. 建立映射关系
    _debug(path.join(__dirname, '../../../relation.json'))
    let relations = getJSON(path.join(__dirname, '../../../relation.json'));
    _debug(relations);
    if (relations && relations.rent) {
        let {table, relation} = relations.rent;
        _debug(table)
        if (table) {
            if (relation) {
                for (let key in relation) {
                    let model = table[key];
                    let rel = relation[key];
                    for (let op in rel) {
                        _debug(op)
                        if (_.includes(['hasMany', 'hasOne', 'belongsTo', 'belongsToMany'], op) && table[rel[op]]) {
                            let otherModel = table[rel[op]];
                            fs.appendFileSync(index_ts_file, `${model}.${op}(${otherModel})\n`)
                        }
                    }
                }
            }
            //3. 导出表结构
            fs.appendFileSync(index_ts_file, 'export {')
            let exportContent = "\n\trent_db,"
            for(let key in table) {
                exportContent += "\n\t" + table[key] + ","
            }
            _debug(exportContent)
            fs.appendFileSync(index_ts_file, exportContent.substring(0, exportContent.length - 1));
            fs.appendFileSync(index_ts_file, '\n}')
        }
    }
    
}

func().then(function() {
    _debug('完成')
}).catch(function(err) {
    _debug(err)
})