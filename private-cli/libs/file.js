const fs = require("fs");
// 根据问答操作文件
const deleteFolder = path => {
  let files = [];
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path);
      files.forEach(function (file, index) {
        let curPath = path + "/" + file;
        if (fs.statSync(curPath).isDirectory()) {
          deleteFolder(curPath);
          resolve()
        } else {
          fs.unlinkSync(curPath);
          resolve()
        }
      });
      fs.rmdirSync(path);
      resolve()
    } else {
      reject()
    }
  })
}

module.exports = deleteFolder;