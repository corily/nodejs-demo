const tpl = require('art-template')
const fs = require('fs')
const http = require('http')

http.createServer()
    .on('request', (req, res) => {
      const url = req.url
      const obj = {
        name: 'vovo',
        age: 18,
        hobbies: ['吃饭', '睡觉', '打豆豆']
      }
      
      fs.readFile('./tpl.html', (err, data) => {
        if (err) return console.log('读取失败~~');
        
        // data: 默认是二进制数据
        // render接收的参数1是 字符串
        const ret = tpl.render(data.toString(), obj)
        console.log(ret);
        res.end(ret) 
      })

    })
    .listen(3000, () => {
      console.log('server running...');
    })

