#!/usr/bin/env node
const program = require('commander');
const conv = require('../packages/commands/conv');

program
    .version('1.0.0', '-v, --version')
    .command('conv')
    .option('-i, --input <input>', '输入文件名')
    .option('-o, --output <output>', '输出文件名')
    .option('-u, --unique', '根据event对数据进行去重')
    .description('将永辉的数据格式由json转为markdown')
    .action(function(cmd) {
      conv(cmd);
    });

program.parse(process.argv);
