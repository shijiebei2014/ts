"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var util = require("util");
var colors = require("colors");
var urllib = require("urllib");
var cheerio = require("cheerio");
var _ = require("lodash");
var index_1 = require("./models/rent/index");
var constants_1 = require("./utils/constants");
var jsonUtil_1 = require("./utils/jsonUtil");
var debugUtil_1 = require("./utils/debugUtil");
var _jsonp_substring = function (string) {
    var _ends = [')', ');'];
    var maxLenth = _.max(_.chain(_ends).map(function (s) {
        return s ? s.length : 0;
    }).value());
    if (string && string.trim().length > 2) {
        for (var _i = 0, _ends_1 = _ends; _i < _ends_1.length; _i++) {
            var str = _ends_1[_i];
            if (_.endsWith(string, str)) {
                return string.trim().substring(constants_1.JSONCALLBACK.length + 1, string.length - str.length);
            }
        }
    }
    return string.trim();
};
var get_domain = function () {
    return __awaiter(this, void 0, void 0, function () {
        var retObj, content, $_1, dds_1, promises_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.City.sync({
                        force: false
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, urllib.request(constants_1.CITY_URL, { timeout: constants_1.TIMEOUT })];
                case 2:
                    retObj = _a.sent();
                    if (!(retObj.status == 200)) return [3 /*break*/, 4];
                    content = retObj.data.toString();
                    $_1 = cheerio.load(content);
                    dds_1 = $_1('#clist dd');
                    promises_1 = [];
                    dds_1.each(function (i) {
                        if (i < dds_1.length - 1) {
                            var cities = $_1(this).children('a');
                            var provinceName_1 = $_1(this).prev('dt').text();
                            cities.each(function (j) {
                                var cityName = $_1(this).text();
                                var href = $_1(this).attr('href');
                                promises_1.push(index_1.City.findOrCreate({
                                    where: {
                                        cityName: cityName,
                                        provinceName: provinceName_1
                                    },
                                    defaults: {
                                        _58_domain: href
                                    }
                                }));
                            });
                        }
                    });
                    return [4 /*yield*/, Promise.all(promises_1)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    debugUtil_1._debug(colors.red('获取网页信息失败'));
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
};
var get_city_detail = function (cityName, city) {
    return __awaiter(this, void 0, void 0, function () {
        var url, retObj, content, $_2, as, promises_2, areas_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.Area.sync({ force: false })];
                case 1:
                    _a.sent();
                    if (!!city) return [3 /*break*/, 3];
                    return [4 /*yield*/, index_1.City.findOne({
                            where: {
                                cityName: cityName
                            }
                        })];
                case 2:
                    city = _a.sent();
                    _a.label = 3;
                case 3:
                    debugUtil_1._debug("\u57CE\u5E02: " + city.get('cityName'));
                    if (!city) return [3 /*break*/, 8];
                    url = city.get('_58_domain') + "?pagetype=area";
                    return [4 /*yield*/, urllib.request(url, { timeout: constants_1.TIMEOUT })];
                case 4:
                    retObj = _a.sent();
                    if (!retObj.status) return [3 /*break*/, 6];
                    content = retObj.data.toString();
                    $_2 = cheerio.load(content);
                    as = $_2('.secitem_fist dd a');
                    promises_2 = [], areas_1 = [];
                    as.each(function (i) {
                        var dd = $_2(this);
                        var areaName = dd.text();
                        var _58_domain = "" + constants_1.URL_ROOT + dd.attr('href');
                        debugUtil_1._debug(areaName + " " + _58_domain);
                        areas_1.push({
                            areaName: areaName,
                            _58_domain: _58_domain
                        });
                        promises_2.push(index_1.Area.findOrCreate({
                            where: {
                                areaName: areaName
                            },
                            defaults: {
                                _58_domain: _58_domain
                            }
                        }).spread(function (area, created) {
                            if (area) {
                                area.setCity(city);
                            }
                        }));
                    });
                    return [4 /*yield*/, Promise.all(promises_2)];
                case 5:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    debugUtil_1._debug(colors.red("\u83B7\u53D6" + cityName + "\u79DF\u623F\u4FE1\u606F\u5931\u8D25"));
                    _a.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    debugUtil_1._debug(colors.red("\u6CA1\u6709" + cityName + "\u57CE\u5E02\u7684\u79DF\u623F\u4FE1\u606F"));
                    _a.label = 9;
                case 9: return [2 /*return*/];
            }
        });
    });
};
var get_cities_detail = function () {
    return __awaiter(this, void 0, void 0, function () {
        var cities, promises, _i, cities_1, city;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, index_1.City.findAll({
                        where: {}
                    })];
                case 1:
                    cities = _a.sent();
                    debugUtil_1._debug(cities.length);
                    promises = [];
                    for (_i = 0, cities_1 = cities; _i < cities_1.length; _i++) {
                        city = cities_1[_i];
                        debugUtil_1._debug("\u57CE\u5E02: " + city.get('cityName'));
                        promises.push(get_city_detail(city.cityName, city));
                    }
                    return [4 /*yield*/, Promise.all(promises)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
};
var get_hourse_detail = function (url) {
    return __awaiter(this, void 0, void 0, function () {
        var retObj, mapping, content, $, result, info_1, _url, retObj_1, content_1, jsonstring, obj, data, pay_type, rent_type, temp, key, attr, agentName, agentCompany, agentContact, agent, content_2, jsonstring, obj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, urllib.request(url, { timeout: constants_1.TIMEOUT })];
                case 1:
                    retObj = _a.sent();
                    mapping = jsonUtil_1.transform(jsonUtil_1.getJSON(null)['source']['58']);
                    if (!(retObj.status == 200)) return [3 /*break*/, 11];
                    content = retObj.data.toString();
                    $ = cheerio.load(content);
                    result = content.match(/____json4fe = \{(.*)\};/g);
                    if (!(result.length == 1 && result[0])) return [3 /*break*/, 10];
                    info_1 = JSON.parse(result[0].substring('____json4fe ='.length, result[0].length - 1));
                    if (!(info_1.catentry && info_1.catentry.dispid && info_1.userid)) return [3 /*break*/, 10];
                    _url = "http://api.house.58.com/house/postOtherInfo?jsoncallback=" + constants_1.JSONCALLBACK + "&userId=" + info_1.userid + "&cateId=" + info_1.catentry.dispid;
                    debugUtil_1._debug(_url);
                    return [4 /*yield*/, urllib.request(_url, { timeout: constants_1.TIMEOUT })];
                case 2:
                    retObj_1 = _a.sent();
                    if (!(retObj_1.status == 200)) return [3 /*break*/, 8];
                    content_1 = retObj_1.data.toString();
                    jsonstring = _jsonp_substring(content_1);
                    obj = JSON.parse(jsonstring);
                    if (util.isArray(obj.data)) {
                        debugUtil_1._debug("infoId: " + info_1.infoid);
                        data = _.find(obj.data, function (d) {
                            return d && d.infoId == info_1.infoid;
                        });
                        if (data) {
                            pay_type = $('.house-pay-way .c_333').text();
                            rent_type = $('.house-desc-item .f14 .mr_15').eq(0).next().text();
                            temp = {
                                url: url,
                                pay_type: pay_type,
                                rent_type: rent_type
                            };
                            for (key in mapping) {
                                attr = mapping[key];
                                temp[attr] = data[key];
                            }
                            debugUtil_1._debug(temp);
                        }
                    }
                    agentName = $('.house-agent-info .agent-name a').text();
                    $('.house-agent-info .agent-subgroup').find(':nth-child(1)').remove();
                    agentCompany = $('.house-agent-info .agent-subgroup').text().replace(/\r\n/, '').trim();
                    agentContact = $('.house-fraud-tip .phone-num').text();
                    debugUtil_1._debug('中介信息: %O', {
                        agentName: agentName,
                        agentCompany: agentCompany,
                        agentContact: agentContact
                    });
                    return [4 /*yield*/, index_1.Agent.sync({ force: false })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, index_1.Agent.findOne({
                            where: {
                                agentName: agentName,
                                agentCompany: agentCompany
                            }
                        })];
                case 4:
                    agent = _a.sent();
                    console.log(agent.get('agentContact'));
                    if (!(agent && agent.get('agentContact') != agentContact)) return [3 /*break*/, 6];
                    agent.agentContact = agentContact;
                    return [4 /*yield*/, agent.save()];
                case 5:
                    agent = _a.sent();
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, index_1.Agent.create({
                        agentName: agentName,
                        agentCompany: agentCompany,
                        agentContact: agentContact
                    })];
                case 7:
                    agent = _a.sent();
                    _a.label = 8;
                case 8:
                    _url = "http://api.fang.58.com/vppvs/q.cgi?id=" + info_1.infoid + "&callback=" + constants_1.JSONCALLBACK;
                    debugUtil_1._debug(_url);
                    return [4 /*yield*/, urllib.request(_url, { timeout: constants_1.TIMEOUT })];
                case 9:
                    retObj_1 = _a.sent();
                    if (retObj_1.status == 200) {
                        content_2 = retObj_1.data.toString();
                        jsonstring = _jsonp_substring(content_2);
                        obj = JSON.parse(jsonstring);
                        if (util.isObject(obj)) {
                            if (obj.nearbyHouse && util.isArray(obj.nearbyHouse.houseList)) {
                                debugUtil_1._debug('-------附近房源--------');
                                _.each(obj.nearbyHouse.houseList, function (h) {
                                    debugUtil_1._debug(h);
                                });
                            }
                        }
                    }
                    _a.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    debugUtil_1._debug(colors.red('获取房源信息失败'));
                    _a.label = 12;
                case 12: return [2 /*return*/];
            }
        });
    });
};
debugUtil_1._debug(jsonUtil_1.getJSON(null));
