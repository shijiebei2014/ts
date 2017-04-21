"use strict";
exports.__esModule = true;
var interface_1 = require("../interfaces/interface");
var chai_1 = require("chai");
require("mocha");
describe('interface', function () {
    it('case1', function () {
        var ret = interface_1.test();
        chai_1.expect(ret).to.equal('Hello World');
    });
});
