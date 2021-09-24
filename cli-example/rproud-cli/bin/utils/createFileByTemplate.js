const fs = require('fs');
const ejs = require('ejs');
const path = require('path');

/**
 * 根据模版创建文件
 * @param {*} fileName
 * @param {*} param
 */
module.exports = createFileByTemplate = (fileName, param) => {
  const filePath = path.resolve(__dirname, `../template/${fileName}.ejs`);
  const template = fs.readFileSync(filePath);
  return ejs.render(template.toString(), param);
};
