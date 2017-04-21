"use strict";
exports.__esModule = true;
var db_1 = require("../db");
var sequelize_1 = require("sequelize");
var City = db_1["default"].define('city', {
    cityName: sequelize_1["default"].STRING,
    cityId: sequelize_1["default"].STRING,
    pinyin: sequelize_1["default"].STRING,
    cityVersion: sequelize_1["default"].INTEGER,
    hot: sequelize_1["default"].INTEGER,
    supportSubway: sequelize_1["default"].INTEGER
}, {
    freezeTableName: true
});
exports["default"] = City;
