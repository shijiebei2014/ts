"use strict";
exports.__esModule = true;
var db_1 = require("../db");
var sequelize_1 = require("sequelize");
var Project = db_1["default"].define('project', {
    name: sequelize_1["default"].STRING
}, {
    freezeTableName: true
});
exports["default"] = Project;
