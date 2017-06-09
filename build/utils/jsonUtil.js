"use strict";
exports.__esModule = true;
var fs = require("fs");
var util = require("util");
var path = require("path");
var _ = require("lodash");
var debugUtil_1 = require("./debugUtil");
var getJSON = function (filepath) {
    filepath = filepath || path.join(__dirname, '../../common.json');
    var ret = _.attempt(function () {
        if (fs.existsSync(filepath)) {
            var buf = fs.readFileSync(filepath);
            if (buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
                buf = buf.slice(3);
            }
            var content = buf.toString('utf-8').replace(/\/\/(.*)/, '');
            return JSON.parse(content);
        }
        else {
            return new Error("\u6587\u4EF6" + filepath + "\u4E0D\u5B58\u5728");
        }
    });
    if (_.isError(ret)) {
        return null;
    }
    debugUtil_1._debug_util(ret);
    return ret;
};
exports.getJSON = getJSON;
var transform = function (obj) {
    if (!util.isObject(obj)) {
        return null;
    }
    _.attempt(function () {
        var json = getJSON(null);
        if (json) {
            var map = json['house_table'];
            for (var key in obj) {
                var val = obj[key];
                if (map[val]) {
                }
                else {
                    obj[key] = map[key];
                }
            }
        }
        return obj;
    });
    return obj;
};
exports.transform = transform;
