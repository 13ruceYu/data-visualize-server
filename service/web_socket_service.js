/*
 * @Author: bruce yu
 * @Date: 2021-02-21 15:22:12
 * @LastEditTime: 2021-02-21 17:32:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /data-visualize-server/service/web_socket_service.js
 */
const path = require('path');
const fileUtils = require('../utils/file_utils')

const WebSocket = require('ws')
// 创建 websocket 服务端对象
const wss = new WebSocket.Server({
  port: 9998
})

// 服务端开启监听
module.exports.listen = () => {
  // 对客户端的连接时间监听
  // client: ；代表的是客户端的连接 socket 对象
  wss.on('connection', client => {
    console.log('有客户端连接成功啦！');

    // 对 client 进行 message 事件监听
    // msg: client 发送给服务端的数据
    client.on('message', async msg => {
      console.log('client 发送给 server 的数据: ', msg);
      let payload = JSON.parse(msg)
      const action = payload.action
      if (action === 'getData') {
        let filePath = '../data/' + payload.chartName + '.json'
        filePath = path.join(__dirname, filePath)
        const ret = await fileUtils.getFileJsonData(filePath)
        // 需要在服务端获取到数据的基础上，增加 data 字段
        // data 对应的值，就是某个 json 文件的内容
        payload.data = ret
        client.send(JSON.stringify(payload))
      } else {
        // 将数据原封不动的转发给每一个处于连接状态的 client
        wss.clients.forEach(client => {
          client.send(msg)
        })
      }
      // client.send('hello socket from backend')
    })
  })
}
