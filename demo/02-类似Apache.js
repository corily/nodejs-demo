const http = require('http')
const fs = require('fs')

const server = http.createServer()

const www = 'F:/learning/nodejs'

server.on('request', (req, res) => {
  const url = req.url

  // console.log('url: ', url)
  // res.setHeader('Content-type', 'text/html;charset=utf-8')
  // filepath = '/index.html'

  // if (url !== '/') {
  //   filepath = url
  // }
  // fs.readFile(`${www}${filepath}`, (err, data) => {
  //   if (err) return res.end('404 Not Found')
  //   res.end(data) 
  // })

/*
    1、读取模板引擎
    2、读取目录中的文件和目录
    3、将 读取目录中的文件和目录 替换到模板引擎里
*/

  // 文件操作路径可以省略 ./  【require 不能省略 ./】
  //        fs.readFile('template.html', () => {})
  // 等价于 fs.readFile('./template.html', () => {})
  fs.readFile('./template.html', (err, data) => {
    if (err) return res.end('404 Not Found')
    fs.readdir(`${www}${url}`, (err, files) => {
      if (err) return res.end('Can not find www dir')
      console.log(files)
      let content = ''
      files.forEach(v => {
        content += `<li><a href="javascript:;">${v}</a></li>`
      })
      data = data.toString()
      data = data.replace('$$__$$', content)
      res.end(data)
    })
  })
})


server.listen(3000, () => {
  console.log('server running...'); 
})