/*
  入口文件：
      创建服务
      做一些服务相关配置
          模板引擎
          body-parser 解析表单 post 请求体参数
          提供静态资源服务
      挂载路由
      监听端口号
*/

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');

const router = require('./router')

const app = express()

// 开放公共路径
app.use('/public/', express.static(path.join(__dirname, '../../public/')))
// app.use(express.static('public'))

// 配置使用 art-template 模板引擎
// 第一个参数：用art-template模板引擎渲染 .html 结尾的文件
app.engine('html', require('express-art-template'));


// 配置 body-parser 之后，可以用 req 请求对象的 body 属性接收post参数
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())

// 把路由容器挂载到 app 服务中
app.use(router)


app.listen(3000, () => {
  console.log('server is running at port 3000')
})