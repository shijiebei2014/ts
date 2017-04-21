"use strict";
exports.__esModule = true;
var db_1 = require("../db");
var sequelize_1 = require("sequelize");
var Company = db_1["default"].define('company', {
    name: sequelize_1.Sequelize.STRING
}, {
    freezeTableName: true
});
exports["default"] = Company;
