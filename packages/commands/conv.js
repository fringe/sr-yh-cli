
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const readline = require('readline');

/**
 *
 * @param {*} cmd
 */
function conv(cmd) {
  if (! (cmd.input && fs.existsSync(path.resolve(__dirname, cmd.input )))) {
    console.log(chalk.red('the input file not exist'));
    return;
  }
  if (!cmd.output) {
    console.log(chalk.red('the output not exist'));
    return;
  }
  const data = fs.createReadStream(path.resolve(__dirname, cmd.input ));

  const rl = readline.createInterface({
    input: data,
  });

  let content = '';
  const set = new Set();
  rl.on('line', (msg) => {
    try {
      const obj = JSON.parse(msg.replace(/\$/g, ''));
      if (cmd.unique && set.has(obj.event)) {
        return;
      }
      set.add(obj.event);
      content += `### ${obj.event}\n`;
      content += `${JSON.stringify(obj, null, 4)}\n\n`;
    } catch (err) {
    }
  }).on('close', () => {
    fs.writeFileSync(path.resolve(__dirname, cmd.output), content);
  });
}

module.exports = conv;
