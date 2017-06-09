"use strict";
exports.__esModule = true;
var rent_db_1 = require("../../rent_db");
var sequelize_1 = require("sequelize");
var Agent = rent_db_1["default"].define('agent', {
    agentName: sequelize_1["default"].STRING,
    agentCompany: sequelize_1["default"].STRING,
    agentContact: sequelize_1["default"].STRING
}, {
    freezeTableName: true
});
exports["default"] = Agent;
