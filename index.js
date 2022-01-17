#!/usr/bin/env node

const program = require('commander')
const helpOptions = require('./lib/core/helpOptions') 
const createCommands = require('./lib/core/createCommands')

// 版本号
program.version(require('./package.json').version)
// 其他执行 --help
helpOptions();
// 创建create指令
createCommands();

program.parse(process.argv)