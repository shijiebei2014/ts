"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var debugUtil_1 = require("../../utils/debugUtil");
var jsonUtil_1 = require("../../utils/jsonUtil");
var func = function () {
    return __awaiter(this, void 0, void 0, function () {
        var files, index_ts_file, index_js_file, relations, _a, table, relation, key, model, rel, op, otherModel, exportContent, key;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, new Promise(function (resolved, rejected) {
                        fs.readdir(path.join(__dirname).replace('build', 'src'), function (err, files) {
                            if (err) {
                                rejected(err);
                            }
                            else {
                                resolved(files);
                            }
                        });
                    })];
                case 1:
                    files = _b.sent();
                    index_ts_file = path.join(__dirname, 'index.ts').replace('build', 'src');
                    index_js_file = path.join(__dirname, 'index.js');
                    debugUtil_1._debug(index_ts_file);
                    fs.writeFileSync(index_ts_file, "import rent_db from '../../rent_db'\n");
                    debugUtil_1._debug(files);
                    _.each(files, function (file) {
                        debugUtil_1._debug(file);
                        if (!_.includes(['auto.ts', 'index.ts'], file) && _.endsWith(file, '.ts')) {
                            var ret = path.parse(path.join(__dirname, file));
                            var fileName = ret.name;
                            var mod = _.capitalize(fileName);
                            debugUtil_1._debug("fileName: " + fileName + " module: " + mod + " index_ts_file: " + index_ts_file);
                            fs.appendFileSync(index_ts_file, "import " + mod + " from './" + fileName + "'\n");
                        }
                    });
                    debugUtil_1._debug(path.join(__dirname, '../../../relation.json'));
                    relations = jsonUtil_1.getJSON(path.join(__dirname, '../../../relation.json'));
                    debugUtil_1._debug(relations);
                    if (relations && relations.rent) {
                        _a = relations.rent, table = _a.table, relation = _a.relation;
                        debugUtil_1._debug(table);
                        if (table) {
                            if (relation) {
                                for (key in relation) {
                                    model = table[key];
                                    rel = relation[key];
                                    for (op in rel) {
                                        debugUtil_1._debug(op);
                                        if (_.includes(['hasMany', 'hasOne', 'belongsTo', 'belongsToMany'], op) && table[rel[op]]) {
                                            otherModel = table[rel[op]];
                                            fs.appendFileSync(index_ts_file, model + "." + op + "(" + otherModel + ")\n");
                                        }
                                    }
                                }
                            }
                            fs.appendFileSync(index_ts_file, 'export {');
                            exportContent = "\n\trent_db,";
                            for (key in table) {
                                exportContent += "\n\t" + table[key] + ",";
                            }
                            debugUtil_1._debug(exportContent);
                            fs.appendFileSync(index_ts_file, exportContent.substring(0, exportContent.length - 1));
                            fs.appendFileSync(index_ts_file, '\n}');
                        }
                    }
                    return [2 /*return*/];
            }
        });
    });
};
func().then(function () {
    debugUtil_1._debug('完成');
})["catch"](function (err) {
    debugUtil_1._debug(err);
});
