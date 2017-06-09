//- 系统
import * as util from 'util'
import * as fs from 'fs'
//- 第三方包
import * as colors from 'colors'
import * as urllib from 'urllib'
import * as cheerio from 'cheerio'
import * as _ from 'lodash'
//- 表结构
// import db from './rent_db'
import {rent_db, City, Area, House, Agent} from './models/rent/index'
//- util
import { URL_ROOT, CITY_URL, TIMEOUT, JSONCALLBACK} from './utils/constants'
import { getJSON, transform } from './utils/jsonUtil'
import {_debug} from './utils/debugUtil'


let _jsonp_substring = function (string) {
    let _ends = [')', ');'];
    let maxLenth = _.max(_.chain(_ends).map(function (s) {
        return s ? s.length : 0;
    }).value());
    if (string && string.trim().length > 2) {
        for (let str of _ends) {
            if (_.endsWith(string, str)) {
                return string.trim().substring(JSONCALLBACK.length + 1, string.length - str.length)
            }
        }
    }
    return string.trim()
}

let get_domain = async function() { //获取域名
    await City.sync({ //表结构同步
        force: false
    })
    let retObj = await urllib.request(CITY_URL, { timeout: TIMEOUT})
    if (retObj.status == 200) {
        let content = retObj.data.toString()
        //_debug(content);
        let $ = cheerio.load(content)
        let dds = $('#clist dd');
        let promises = [];
        dds.each(function(i) {
            if (i < dds.length - 1) { //排除热门和其他
                let cities = $(this).children('a')
                let provinceName = $(this).prev('dt').text()

                cities.each(function(j) {
                    var cityName = $(this).text()
                    var href = $(this).attr('href')

                    promises.push(City.findOrCreate({
                        where: {
                            cityName,
                            provinceName,
                        },
                        defaults: {
                            _58_domain: href
                        }
                    }))
                })
            }
        })
        await Promise.all(promises);
    } else {
        _debug(colors.red('获取网页信息失败'))
    }
}

let get_city_detail = async function(cityName, city) {
    await Area.sync({force: false});

    if (!city) {
        city = await City.findOne({
            where: {
                cityName,
            }
        })
    }
    _debug(`城市: ${city.get('cityName')}`)
    if (city) {
        let url = `${city.get('_58_domain')}?pagetype=area`;
        let retObj = await urllib.request(url, { timeout: TIMEOUT });
        if (retObj.status) {
            let content = retObj.data.toString()
            let $ = cheerio.load(content)

            let as = $('.secitem_fist dd a')
            let promises = [], areas = []
            as.each(function(i) {
                let dd = $(this);
                let areaName = dd.text()
                let _58_domain = `${URL_ROOT}${dd.attr('href')}`
                _debug(`${areaName} ${_58_domain}`);
                areas.push({
                    areaName,
                    _58_domain,
                })
                promises.push(Area.findOrCreate({
                    where: {
                        areaName,
                    },
                    defaults: {
                        _58_domain
                    }
                }).spread(function (area, created) {
                    // findOrCreate返回的是两个数据,then,将数据打包成一个数组,area[0],area[1] == created
                    // Promise.spread将数组拆成多个数组,
                    if (area) {
                        // _debug(area.__proto__)
                        // _debug(area.setCity)
                        area.setCity(city)
                    }
                }))
            })
            await Promise.all(promises)
        } else {
            _debug(colors.red(`获取${cityName}租房信息失败`))
        }
    } else {
        _debug(colors.red(`没有${cityName}城市的租房信息`))
    }
}

let get_cities_detail = async function() {
    let cities = await City.findAll({ //获取所有的城市
        where: {}
    });
    _debug(cities.length)
    let promises = []
    for(let city of cities) {
        _debug(`城市: ${city.get('cityName')}`)
        promises.push(get_city_detail(city.cityName, city))
    }
    await Promise.all(promises)
}
/*get_domain().then(function() {
    _debug(colors.green('完成'))  
}).catch(function(err) {
    _debug(colors.red(`${err}`))
})
get_cities_detail().then(function () {
    _debug(colors.green('完成'))
}).catch(function (err) {
    _debug(colors.red(`${err}`))
})
*/

let get_hourse_detail = async function(url) {
    let retObj = await urllib.request(url, { timeout: TIMEOUT })
    let mapping = transform(getJSON(null)['source']['58'])
    if (retObj.status == 200) {
        let content = retObj.data.toString()
        // fs.writeFileSync('test.html', content)
        //_debug(content);
        let $ = cheerio.load(content)
        // let subContent = $('head script').eq(0).text()
        let result = content.match(/____json4fe = \{(.*)\};/g)

        if (result.length == 1 && result[0]) {
            let info =JSON.parse(result[0].substring('____json4fe ='.length, result[0].length - 1))

            if (info.catentry && info.catentry.dispid && info.userid) { //获取数据接口
                let _url = `http://api.house.58.com/house/postOtherInfo?jsoncallback=${JSONCALLBACK}&userId=${info.userid}&cateId=${info.catentry.dispid}`
                _debug(_url)
                let retObj = await urllib.request(_url, { timeout: TIMEOUT })
                if (retObj.status == 200) {
                    let content = retObj.data.toString()
                    let jsonstring = _jsonp_substring(content)
                    // _debug(jsonstring)
                    let obj = JSON.parse(jsonstring)
                    if (util.isArray(obj.data)) {
                        //_debug(obj.data)
                        _debug(`infoId: ${info.infoid}`)
                        let data = _.find(obj.data, (d)=>{
                            return d && d.infoId == info.infoid
                        })
                        if (data) {
                            let pay_type = $('.house-pay-way .c_333').text()
                            let rent_type = $('.house-desc-item .f14 .mr_15').eq(0).next().text()
                            let temp = {
                                url,
                                pay_type,
                                rent_type,
                            }
                            for(let key in mapping) {
                                let attr = mapping[key]
                                temp[attr] = data[key] 
                            }
                            _debug(temp)
                        }
                    }
                    // 获取代理人(中介信息)--------
                    let agentName = $('.house-agent-info .agent-name a').text();
                    $('.house-agent-info .agent-subgroup').find(':nth-child(1)').remove();
                    let agentCompany = $('.house-agent-info .agent-subgroup').text().replace(/\r\n/, '').trim()
                    let agentContact = $('.house-fraud-tip .phone-num').text();
                    
                    _debug('中介信息: %O', {
                        agentName,
                        agentCompany,
                        agentContact,
                    })
                    //保存中介信息
                    await Agent.sync({force: false})
                    let agent = await Agent.findOne({
                        where: {
                            agentName,
                            agentCompany,
                        }
                    })
                    console.log(agent.get('agentContact'))
                    if (agent && agent.get('agentContact') != agentContact) { //修改
                        agent.agentContact = agentContact;
                        agent = await agent.save()
                    } else { //创建
                        agent = await Agent.create({
                            agentName,
                            agentCompany,
                            agentContact,
                        })
                    }
                }
                // 附近推荐房源-----------
                _url = `http://api.fang.58.com/vppvs/q.cgi?id=${info.infoid}&callback=${JSONCALLBACK}`
                _debug(_url)
                retObj = await urllib.request(_url, { timeout: TIMEOUT })
                if (retObj.status == 200) {
                    let content = retObj.data.toString()
                    let jsonstring = _jsonp_substring(content)
                    //_debug(jsonstring)
                    let obj = JSON.parse(jsonstring)
                    if (util.isObject(obj)) {
                        if (obj.nearbyHouse && util.isArray(obj.nearbyHouse.houseList)) { //附近房源
                            _debug('-------附近房源--------')
                            _.each(obj.nearbyHouse.houseList, (h)=> {
                                _debug(h)
                            })
                        }
                    }
                }
            }
        }
    } else {
        _debug(colors.red('获取房源信息失败'))
    }
}

/*get_hourse_detail('http://sh.58.com/zufang/30167043670352x.shtml').then(function () {
    _debug(colors.green('完成'))
}).catch(function (err) {
    _debug(colors.red(`${err}`))
})*/

_debug(getJSON(null))