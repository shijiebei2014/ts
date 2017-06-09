"use strict";
exports.__esModule = true;
var rent_db_1 = require("../../rent_db");
var sequelize_1 = require("sequelize");
var House = rent_db_1["default"].define('hourse', {
    address: sequelize_1["default"].STRING,
    desc: sequelize_1["default"].STRING,
    room: sequelize_1["default"].STRING,
    shi: sequelize_1["default"].STRING,
    ting: sequelize_1["default"].STRING,
    wei: sequelize_1["default"].STRING,
    url: sequelize_1["default"].STRING,
    rent_type: sequelize_1["default"].STRING,
    floor: sequelize_1["default"].STRING,
    totalFloor: sequelize_1["default"].STRING,
    toward: sequelize_1["default"].STRING,
    district: sequelize_1["default"].STRING,
    busi_district: sequelize_1["default"].STRING,
    pay_type: sequelize_1["default"].STRING,
    size: sequelize_1["default"].STRING,
    price: sequelize_1["default"].STRING,
    fittype: sequelize_1["default"].STRING
}, {
    freezeTableName: true
});
exports["default"] = House;
