// nodejs 的 web 应用框架
const express = require('express')

const bodyParser = require('body-parser')

const path = require('path');

// 代替原来的 http.createServer()
const app = express()

const comments = [
  {
    value: '巴拉巴拉balabala',
    name: 'bobo',
    time: '2020-11-01'
  },
  {
    value: '吧啦啦啦啦',
    name: 'jack',
    time: '2020-11-01'
  },
  {
    value: '吧啦啦啦鹅鹅鹅啦',
    name: '王五',
    time: '2020-11-01'
  },
  {
    value: '巴拉巴拉balabala',
    name: '李四',
    time: '2020-11-01'
  },
  {
    value: '吧啦啦啦三生三世啦',
    name: '张',
    time: '2020-11-01'
  }
]

// 公开指定目录
// 公开public目录，通过 /public/xxx 的方式访问 public 目录中的资源
// 推荐写法
app.use('/public/', express.static('../public/'))

// 省略第一个参数时，以 /xxx 方式访问 public 目录资源
// app.use(express.static('./public/'))

// 通过 /aa/xxx 的方式访问 public 目录中的资源
// app.use('/aa/', express.static('./public/'))

// app.use('/favicon.ico', express.static('../favicon.ico'))

// 配置使用 art-template 模板引擎
// 第一个参数：用art-template模板引擎渲染 .html 结尾的文件
app.engine('html', require('express-art-template'));

/*
  express 为 response 对象提供了 render 方法
  render 方法默认是不可使用的，需要配置模板引擎
  res.render('html模板名', {模板数据})
  第一个参数不能写路径，默认会去 views 目录查找该模板文件
  express 默认约定： 所有视图文件都放在 views 目录下
  修改默认存放目录views: app.set('views', path.join(__dirname, 'pages'))
*/

// 配置 body-parser 之后，可以用 req 请求对象的 body 属性接收post参数
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
// app.use(bodyParser.json())


// 基本路由
// Get 请求 / 
app.get('/', (req, res) => {
  // url参数： req.query
  // 模板引擎：res.render(filename, {模板对象})

  // 原生
  // res.write('hello')
  // res.write('world')
  // res.end()

  // res.end('hello world')

  // send: express API
  // res.send('hello express') 

  // res.render('index.html', {comments})
  res.render(path.resolve(__dirname, '../views/index.html'), {comments})
})

app.get('/admin', (req, res) => {
  // res.render('admin/index.html', {title: '管理系统'})
  res.render(path.resolve(__dirname, '../views/admin/index.html'), {title: '管理系统'})
})

app.get('/post', (req, res) => {
  // res.render('post.html')
  res.render(path.resolve(__dirname, '../views/post.html'))
})

// form 用 get 接收
app.get('/comment', (req, res) => {
  console.log(req.query);
  const comment = {
    ...req.query,
    time: '2021-01-01'
  }
  comments.unshift(comment)

  // 重定向到首页
  // 原生：
  // res.statusCode = 302
  // res.setHeader('Location', '/')

  res.redirect('/')
})

// form 用 post 接收， express没有默认接收post请求的API，需要用 body-parser 处理
app.post('/comment', (req, res) => {
  console.log(req.body);
  const comment = {
    ...req.body,
    time: '2021-01-01'
  }
  comments.unshift(comment)

  // 重定向到首页
  // 原生：
  // res.statusCode = 302
  // res.setHeader('Location', '/')

  res.redirect('/')
})

app.get('*', (req, res) => {
  // res.render('not-found.html')
  res.render(path.resolve(__dirname, '../views/not-found.html'))
})

app.listen(3000, () => {
  console.log('app is running at port 3000')
})