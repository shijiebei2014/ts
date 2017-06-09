"use strict";
exports.__esModule = true;
var sequelize_1 = require("sequelize");
var sequelize = new sequelize_1.Sequelize('rent', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});
exports["default"] = sequelize;
