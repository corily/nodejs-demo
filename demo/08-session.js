/*
  express 框架默认不支持 session 和 cookie
    解决：使用第三方包 express-session 来解决
    注意： 配置在 router 挂载之前
    使用： 配置后， 可通过 req.session 来访问 和 设置 session 成员
          添加： req.session.data = xxx
          访问： req.session.data
*/

const express = require('express');
const session = require('express-session');

const app = express()

// 配置session，然后用 req.session 访问，此配置需在挂载router之前
// secret: 配置加密字符串， 在原有加密基础上 拼接 这个字符串再次加密
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.get('/', (req, res) => {
  res.send(req.session.isLogin ? 'OKK' : 'NOO') 
})

app.get('/login', (req, res) => {
  req.session.isLogin = true
  res.send('login') 
})

app.get('/logout', (req, res) => {
  delete req.session.isLogin
  // req.session.isLogin = null
  res.send('logout')
})

app.get('*', (req, res) => {
  res.send('404') 
})

app.listen(3000, () => {
  console.log('server is running at port 3000')
})