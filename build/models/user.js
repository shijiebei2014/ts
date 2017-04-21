"use strict";
exports.__esModule = true;
var db_1 = require("../db");
var sequelize_1 = require("sequelize");
var User = db_1["default"].define('user', {
    name: sequelize_1["default"].STRING
}, {
    freezeTableName: true
});
exports["default"] = User;
