"use strict";
exports.__esModule = true;
var interface_1 = require("../interfaces/interface");
var jsonUtil_1 = require("../utils/jsonUtil");
var debugUtil_1 = require("../utils/debugUtil");
var chai_1 = require("chai");
require("mocha");
describe('interface', function () {
    it('case1', function () {
        var ret = interface_1.test();
        chai_1.expect(ret).to.equal('Hello World');
    });
    it.only('getJSON', function () {
        debugUtil_1._debug_mocha('开始');
        debugUtil_1._debug_mocha(jsonUtil_1.getJSON(null));
    });
});
