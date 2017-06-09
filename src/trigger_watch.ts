import * as fs from 'fs'
import * as path from 'path'
import * as colors from 'colors'
import * as async from 'async'
import * as moment from 'moment'
import { spawn } from 'child_process'

const INTERVAL = 1500

let _child_process = null
let _interval = 0;

let _retTime = () => {
    return `[${moment().format('HH:mm:ss')}] `
};

let waterFileAndExec =  (file, cb) => {
    if (!fs.existsSync(file)) {
        return cb(`${_retTime()}待监听的文件 ${file} 不存在`);
    }

    console.log(colors.green(`${_retTime()}正在监听文件: ${file} ...`));
    var fsWatch = fs.watch(file, { encoding: 'buffer' }, (eventType, filename) => {
        if (eventType == 'change') {
            var temp = new Date().getTime();
            //console.log(temp - _interval)
            if (temp - _interval >= INTERVAL) {
                _interval = temp;
                async.auto({
                    judge: (done) => {
                        if (_child_process) {
                            _child_process.kill('SIGHUP');
                        }
                        done(null, null);
                    },
                    new: ['judge', (done, result) => { //新开一个子进程
                        _child_process = spawn('mocha', ['-c', file])
                        console.log(colors.red(`${_retTime()}子线程 ${_child_process.pid} start`))
                        _child_process.stdout.on('data', (data) => {
                            process.stdout.write(data);
                        });
                        _child_process.stderr.on('data', (data) => {
                            process.stderr.write(data)
                        });
                        _child_process.on('exit', (code) => {
                            console.log(colors.red(`${_retTime()}子线程 ${_child_process.pid} end`))
                            console.log(colors.green(`${_retTime()}继续监听中...`))
                            done('结束', null)
                        });
                        done(null, null)
                    }]
                },  (err, result) => {
                    if (err) {
                        if (err == '结束') {
                            cb(err, null)
                        } else {
                            process.stderr.write(colors.red(`${_retTime()}错误:${err}`));
                        }
                    } else {

                    }
                })
            }
        }
    })

    fsWatch.on('error', (err) =>{ //监听错误事件
        console.log(`${_retTime()}报错喽`)
        cb(err, null)
    })
}

process.on('exit',  (code) => {
    console.log(`${_retTime()}监听结束`);
    if (_child_process) {
        _child_process.kill('SIGHUP')
    }
})

waterFileAndExec(path.join(__dirname, '/../../zhisiyun/zhisiyun/test/test.js'), (err)=> {
    var now = _retTime()
    if (err) {
        console.log(colors.red(`${_retTime()}${err}`));
    }
    setTimeout(()=> {
        process.exit(0);
    }, 2000)
});