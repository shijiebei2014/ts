"use strict";
exports.__esModule = true;
var user_1 = require("./user");
var company_1 = require("./company");
var project_1 = require("./project");
user_1["default"].hasOne(project_1["default"]);
user_1["default"].belongsTo(company_1["default"]);
