const http = require('http')

const server = http.createServer()


// request 请求事件
// 处理函数参数: request , response
server.on('request', (request, response) => {
  console.log('收到浏览器的请求啦~~')
  console.log(request.url)

  // 中文乱码问题
  response.setHeader('Content-type', 'text/html;charset=utf-8')

  const url = request.url

  if (url === '/' || url === '/index') {
    response.end('hello index')
  } else if (url === '/login') {
    response.end('hello login')
  } else if (url === '/detail') {
    response.end('hello detail')
  } else if (url === '/api/product') {
    const product = [
      {
        name: '线程',
        id: 1
      },
      {
        name: 'I/O',
        id: 2
      },
      {
        name: 'runtime',
        id: 3
      }
    ]
    response.end(JSON.stringify(product))
  } else {
    response.end('404 not found')
  }




  // write方法看使用多次，但一定要用 end 接收响应，否则客户端会一直等待
  // response.write('hello')
  // response.write('node js')
  // response.end('结束响应')


})

server.listen(3000, () => {
  console.log('服务器已启动成功，port: 3000')
})