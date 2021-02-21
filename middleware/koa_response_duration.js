//（洋葱模型）最外层 记录总耗时中间件
module.exports = async (ctx, next) => {
  // 记录开始时间
  const start = Date.now();
  // 触发内层中间件
  await next();
  // 记录结束时间
  const end = Date.now();
  // 设置响应头 X-Response-Time
  const duration = end - start;
  // 设置响应头部 ctx.set
  ctx.set("X-Response-Time", duration + "ms");
};
