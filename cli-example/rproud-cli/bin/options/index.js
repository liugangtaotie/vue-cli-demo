const inquirer = require('inquirer');
const { packageName, language } = require('./options.js');

module.exports = () => {
  return inquirer.prompt([
    // * 输入项目名
    packageName(),
    // * 选择语言（JavaScript/TypeScript）
    language(),
  ]);
};
