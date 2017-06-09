"use strict";
exports.__esModule = true;
var rent_db_1 = require("../../rent_db");
var sequelize_1 = require("sequelize");
var Area = rent_db_1["default"].define('area', {
    areaName: sequelize_1["default"].STRING,
    _58_domain: sequelize_1["default"].STRING
}, {
    freezeTableName: true
});
exports["default"] = Area;
