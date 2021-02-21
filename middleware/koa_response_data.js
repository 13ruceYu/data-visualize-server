// 第三层 业务逻辑中间件
const path = require("path");
const fileUtils = require("../utils/file_utils");
module.exports = async (ctx, next) => {
  // 1、读取文件内容
  // 获取请求的路径，拼接文件路径
  const url = ctx.request.url; // /api/seller --> ../data/seller.json
  let filePath = url.replace("/api", ""); // /seller
  filePath = "../data" + filePath + ".json"; // ../data/seller.json
  filePath = path.join(__dirname, filePath); // 通过 path api 拿到绝对路径
  try {
    const ret = await fileUtils.getFileJsonData(filePath);
    ctx.response.body = ret;
  } catch (error) {
    const errorMsg = {
      message: "读取文件失败，文件资源不存在",
      status: 404,
    };
    ctx.response.body = JSON.stringify(errorMsg);
  }

  await next();
};
// 2、读取文件路径下的文件内容
// 3、设置响应体
