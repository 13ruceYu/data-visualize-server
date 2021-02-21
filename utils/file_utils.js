// 读取文件的工具方法
const fs = require("fs");
module.exports.getFileJsonData = (filePath) => {
  // 通过 fs 根据文件路径读取文件内容
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        // 读取文件失败
        reject(error);
      } else {
        // 读取文件成功 不可用 return，要用 promise
        resolve(data);
      }
    });
  });
};
