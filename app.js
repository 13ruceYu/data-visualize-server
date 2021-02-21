/*
 * @Author: bruce yu
 * @Date: 2020-12-24 20:38:17
 * @LastEditTime: 2021-02-21 17:19:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /data-visualize-server/app.js
 */
// 服务器入口文件
// 1、创建 koa 实例对象
const Koa = require("Koa");
const app = new Koa();

// 2、绑定中间件
// 绑定第一层中间件
const respDurationMiddleware = require("./middleware/koa_response_duration");
app.use(respDurationMiddleware);

// 绑定第二层中间件
const respHeaderMiddleware = require("./middleware/koa_response_header");
app.use(respHeaderMiddleware);

// 绑定第三层中间件
const respDataMiddleware = require("./middleware/koa_response_data");
app.use(respDataMiddleware);

// 3、绑定端口号 8888
app.listen(8888);

console.log("Server running at http://127.0.0.1:8888/");

const webSocketService = require('./service/web_socket_service')
// 开启服务端监听，监听客户端的连接
// 当连接成功后，对客户端 message 事件进行监听
webSocketService.listen()