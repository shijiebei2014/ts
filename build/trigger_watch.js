"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var colors = require("colors");
var async = require("async");
var moment = require("moment");
var child_process_1 = require("child_process");
var INTERVAL = 1500;
var _child_process = null;
var _interval = 0;
var _retTime = function () {
    return "[" + moment().format('HH:mm:ss') + "] ";
};
var waterFileAndExec = function (file, cb) {
    if (!fs.existsSync(file)) {
        return cb(_retTime() + "\u5F85\u76D1\u542C\u7684\u6587\u4EF6 " + file + " \u4E0D\u5B58\u5728");
    }
    console.log(colors.green(_retTime() + "\u6B63\u5728\u76D1\u542C\u6587\u4EF6: " + file + " ..."));
    var fsWatch = fs.watch(file, { encoding: 'buffer' }, function (eventType, filename) {
        if (eventType == 'change') {
            var temp = new Date().getTime();
            if (temp - _interval >= INTERVAL) {
                _interval = temp;
                async.auto({
                    judge: function (done) {
                        if (_child_process) {
                            _child_process.kill('SIGHUP');
                        }
                        done(null, null);
                    },
                    "new": ['judge', function (done, result) {
                            _child_process = child_process_1.spawn('mocha', ['-c', file]);
                            console.log(colors.red(_retTime() + "\u5B50\u7EBF\u7A0B " + _child_process.pid + " start"));
                            _child_process.stdout.on('data', function (data) {
                                process.stdout.write(data);
                            });
                            _child_process.stderr.on('data', function (data) {
                                process.stderr.write(data);
                            });
                            _child_process.on('exit', function (code) {
                                console.log(colors.red(_retTime() + "\u5B50\u7EBF\u7A0B " + _child_process.pid + " end"));
                                console.log(colors.green(_retTime() + "\u7EE7\u7EED\u76D1\u542C\u4E2D..."));
                                done('结束', null);
                            });
                            done(null, null);
                        }]
                }, function (err, result) {
                    if (err) {
                        if (err == '结束') {
                            cb(err, null);
                        }
                        else {
                            process.stderr.write(colors.red(_retTime() + "\u9519\u8BEF:" + err));
                        }
                    }
                    else {
                    }
                });
            }
        }
    });
    fsWatch.on('error', function (err) {
        console.log(_retTime() + "\u62A5\u9519\u55BD");
        cb(err, null);
    });
};
process.on('exit', function (code) {
    console.log(_retTime() + "\u76D1\u542C\u7ED3\u675F");
    if (_child_process) {
        _child_process.kill('SIGHUP');
    }
});
waterFileAndExec(path.join(__dirname, '/../../zhisiyun/zhisiyun/test/test.js'), function (err) {
    var now = _retTime();
    if (err) {
        console.log(colors.red("" + _retTime() + err));
    }
    setTimeout(function () {
        process.exit(0);
    }, 2000);
});
