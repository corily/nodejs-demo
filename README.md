#### Nodejs

- Node.js是一个能够在服务器端运行JavaScript的开放源代码、跨平台**JavaScript运行环境**。

- Node采用Google开发的V8引擎运行js代码，使用**事件驱动、非阻塞和异步I/O模型**等技术来提高性能，可优化应用程序的传输量和规模。



#### 模块封装器

在执行模块代码之前，Node.js 会使用一个如下的函数封装器将其封装：

```javascript
(function(exports, require, module, __filename, __dirname) {
  // __filename: 当前模块的文件名(绝对路径)
  // __dirname: 当前模块的目录名
  // exports对象是对module.exports的引用
  // 模块的代码实际上在这里
  // return module.eexports
});
```

#### module.exports 和 exports 的关系

require能看到的只有module.exports这个对象，它是看不到exports对象的，我们编写模块时用的的exports对象实际上是对module.exports的引用

导出方式：

```javascript
  module.exports = xxx
  module.exports.xxx = xxx
  exports.xxx = xxx
```

例子：
```javascript

exports.foo = 'bar'  // { foo: 'bar' }
module.exports.a = 111  // { foo: 'bar', a: 111 }

// exports !== module.exports
exports = {
  a: 222
}


module.exports.foo = 'vov'  // { foo: 'vov', a: 111 }

exports.c = 333

exports = module.exports // 重新建立引用关系

exports.a = 444   // 重新建立关系，生效 { foo: 'bar', a: 444 }

module.exports = () => {}   // { Function }

```

基本类型： 包括Undefined, Null, Boolean, Number和String五种基本数据类型

引用类型： 保存在（堆内存）内存中的对象们，不能直接操作，只能通过保存在（栈内存）变量中的地址引用对其进行操作


#### Path模块

fs文件操作路径中，相对路径是相对于执行 node 命令所处的路径，因此使用相对路径是不可靠的，应该使用绝对路径

node中的除了 `require`、`exports` 等模块成员，还有其它两个成员

`__dirname`： 获取当前文件`目录的绝对路径`
`__filename`： 获取当前`文件的绝对路径`

```javascript

const { join, resolve } = require('path')

// join 方法，返回拼接后的 规范化路径
join('./a/b', 'c') // 返回 相对路径 ./a/b/c
join('/a/b', '/c') // 返回 绝对路径 /a/b/c


// resolve 方法， 返回解析后的 绝对路径
// 如跟目录为： /目录A
resolve('./a/b', '../c') //  /目录A/a/c
resolve('/a/b', '/c') //  /目录A/c
resolve('/a/b', '/c', 'd') //  /目录A/c/d

```

#### util模块

util.promisify

```javascript

const util = require('util')
const fs = require('fs')

// 返回一个新函数，函数返回promise对象
const readFile = util.promisify(fs.readfile)

readFile('./app.js')
  .then(res => {})
  .catch(err => {})


```

##### 关于Promise： new Promise(executor)
在 new 时，会同时调用 executor 构造函数
中断链式promise:返回一个pending状态 return new Promise(() => {})

```javascript
// p1 new 出来时，会同时执行 executor 函数，然后才会执行 then/catch 方法
const p1 = new Promise((resolve, reject) => {
  resolve('ok)
})

p1
  .then(res => {})
  .catch(err => {})


// p2 new 出来时，会同时执行 executor 函数，再执行 then/catch 方法，1s 后执行setTimeout方法
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('ok')
  }, 1000)
})

p2
  .then(res => {})
  .catch(err => {})

```


- 状态：
  - 待定( pending )： 初始状态
  - 已兑现( fulfilled/resolved )： 操作成功
  - 已拒绝( rejected )： 操作失败

```javascript

// 改变 promise 状态的3种情况
const p1 = new Promise((resolve, reject) => {
  // resolve('ok)
  // reject('error')
  throw 'error'
})

```

- 方法：
  - Promise.resolve()
  - Promise.reject()
  - Promise.all(array)
    - array 的每个元素是promise实例，所有promise实例都执行成功fulfilled，才返回 一个成功的数组，只要有一个执行失败，则all方法终止，返回执行失败的promise内容
  - Promise.race(array)
    - array 的每个元素是promise实例，只要有一个执行完成（fulfilled/rejected），就返回最先执行完成的


```javascript

const p1 = Promise.resolve(1)
const p2 = Promise.resolve(2)
const p3 = Promise.resolve(3)

Promise.all([ p1, p2, p3 ])
  .then(res => {
    console.log(res) // [1,2,3]
  })


const p4 = Promise.resolve(4)
const p5 = Promise.reject(5)
const p6 = Promise.resolve(6)

Promise.all([ p4, p5, p6 ])
  .then(res => {
    // then 不执行
    console.log(res)
  })
  .catch(err => {
    // catch 执行
    console.log(err) // 5
  })


const p7 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const p8 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('failed')
  }, 500)
})

Promise.race([ p7, p8 ])
  .then(res => {
    // then 不执行
    console.log(res)
  })
  .catch(err => {
    // catch 执行
    console.log(err) // failed
  })

```


#### Buffer缓冲器

 - 从结构上看Buffer非常像一个数组，它的元素为16进制的两位数
   - buffer中的每个元素范围 00-ff （0-255  00000000-11111111）
   - 8bit(位) = 1byte(字节)
 - 一个元素就表示内存中的一个字节
   - buffer大小一旦创建了，不能修改
 - 数组不能存储二进制文件，而buffer是专门用来存储二进制数据的
 - buffer不需要引入模块，它是全局作用域的
 - Buffer中的内存不是通过JavaScript分配的，而是在底层通过C++申请的。
 - 可以直接通过Buffer来创建内存中的空间



#### 模板引擎

原生用art-template为例

```javascript
const tpl = require('art-template')
const fs = require('fs')
const http = require('http')

http.createServer()
    .on('request', (req, res) => {

      const obj = {
        name: 'vovo',
        age: 18,
        hobbies: ['吃饭', '睡觉', '打豆豆']
      }

      fs.readFile('./tpl.html', (err, data) => {
        if (err) return res.end('404 Not Found')
        const ret = tpl.render(data.toString(), obj)
        res.end(ret)
      })
      
    })
    .listen(3000, () => {
      console.log('running...')
    })
```




#### require加载模块查找机制

- 1、优先从缓存加载
- 2、核心模块
- 3、路径形式的文件模块
- 4、第三方模块
  - node_modules/xxx
  - node_modules/xxx/package.json
  - node_modules/xxx/package.json 的 main 属性，查找入口文件
  - package.json 或者 main 不存在，则默认查找 index.js 文件
  - 上一级 node_modules/xxx， 上上级...
  - 最后当前磁盘根目录也没有，则报错 can not find module xxx



#### nodemon

自动重启代码，类似devServer


#### Express


##### 1、 模板引擎

用art-template为例

```javascript
const express = require('express')
const app = express()

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

// 使用
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

  res.render('index.html', {comments})
})

```

##### 2、 公开指定目录


```javascript
// 公开public目录，通过 /public/xxx 的方式访问 public 目录中的资源
// 推荐写法
app.use('/public/', express.static(path.join(__dirname, '../public/')))

// 省略第一个参数时，以 /xxx 方式访问 public 目录资源
// app.use(express.static(path.join(__dirname, '../public/')))

// 通过 /aa/xxx 的方式访问 public 目录中的资源
// app.use('/aa/', express.static(path.join(__dirname, '../public/')))

app.use('/favicon.ico', express.static(path.join(__dirname, '../public/favicon.ico')))

```

##### 3、 接收 Get / Post 参数

接收 Get 参数：express内置了 API ，通过 `req.query` 接收

```javascript
// 使用：
app.get('/comment', (req, res) => {
  console.log(req.query);
})
```


接收 Post 参数：用 body-parser 插件 处理

```javascript
// 配置 body-parser 之后，可以用 req 请求对象的 body 属性接收post参数
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
// app.use(bodyParser.json())


// 使用：
app.post('/comment', (req, res) => {
  console.log(req.body);
})
```



##### 4、中间件

中间件：处理请求的一个函数，该函数接收 请求对象req、响应对象res、下一个中间件函数next

Express 应用程序可以使用以下类型的中间件：
  - 应用层中间件
  - 路由器层中间件
  - 错误处理中间件
  - 内置中间件
    - express.static
    - express.json
    - express.urlencoded
  - 第三方中间件


```javascript

// 所有请求都进入这里
app.use((req, res, next) => {
  ...
  next()
})

// url中有 /b/ 的请求进入， 如 /a/b/c ， 此时 req.url = '/c'
app.use('/b', (req, res, next) => {
  ...
  next()
})

// 严格匹配请求方法和请求路径的中间件：路由器层中间件 get/post/put/delete
app.get('/a', (req, res, next) => {
  ...
  next()
})

app.post('/b', (req, res, next) => {
  ...
  next()
})


app.use('/aa', (req, res, next) => {
  fs.readFile('./a/we/sesr/aa', (err, data) => {
    // next: 传入参数，默认跳到错误中间件
    if (err) return next(err)
    next()
  })
})

// 配置 处理404 中间件
app.use((req, res) => {
  res.render(path.join(__dirname, './tpl/404.html')) 
})


// 配置错误处理中间件
app.use((err, req, res, next) => {
  res.status(500).send(err.message)
})

```


#### session


```javascript
/*
  express 框架默认不支持 session 和 cookie
    解决：使用第三方包 express-session 来解决
    注意： 配置在 router 挂载之前
    使用： 配置后， 可通过 req.session 来访问 和 设置 session 成员
          添加： req.session.data = xxx
          访问： req.session.data
*/

// 配置
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

```



#### 数据库

##### MongoDB

非关系型数据库

MongoDB与SQL基本概念的对比

| SQL        | MongoDB   |    说明     |
| :-----     | :-----    |    :----    |
|  database  | database  |       数据库      |
|  table     | collection|       数据库表 / 集合      |
|  row       | document  |       数据记录行 / 文档      |
|  column    | field     |       数据字段 / 域      |
|  index     | index     |       索引      |
|  table joins  |        |       表连接， MongoDB不支持      |
|  primary key  | primary key  |  主键， MongoDB自动将 _id 自动设置为主键   |





基本命令

```javascript

// 启动: 默认使用执行 mongod 命令所在盘根目录下的 /data/db 作为数据存储目录，如果没有该目录，需要手动创建
mongod

// 修改数据存储目录
mongod --dbpath "e:/xx"

// 连接数据库
mongo

// 退出数据库
exit

// 查看显示所有的数据库
show dbs

// 查看当前操作的数据库
db

// 切换到指定的数据库
use 数据库名称

// 插入数据 xxx 为 collection
db.xxx.insertOne({name: 'jack'})

```



##### Mongoose

node中使用MongoDB：使用第三方包 `mongoose`
mongoose是基于mongodb的进一步封装，提供了便捷的API

基本命令

```javascript

const mongoose = require('mongoose');

const Schema = mongoose.Schema

// 1、连接数据库 nodetest， 数据库不存在时，插入第一条数据后将自动创建
mongoose.connect('mongodb://127.0.0.1:27017/nodetest')

/*  
  2、 设计文档结构（表结构）
      字段名称： 表结构中的属性名称
      约束目的：为了保证数据的完整性，不要有脏数据
*/
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})

/*
  3、将文档结构发布为模型
      mongoose.model(数据库名称，架构schema)
        参数1： 传入一个首字母大写开头的字符串，表示数据库名称
                mongoose 会自动将大写首字母的字符串生成 小写复数 的集合名称，如： User -->  users
        参数2： 架构schema
        返回值： 模型构造函数
*/

const User = mongoose.model('User', userSchema)


// 新增数据
new User({
  username: 'jack',
  password: '666',
  email: '666@ad.com'
}).save((err, data) => {
  if (err) return
  ...
})



// 查询数据： 无条件，返回所有数据
User.find((err, data) => {})

// 查询数据： and条件查询
User.find({ username: 'jack', password: '666' }, (err, data) => {})

// 查询数据： or条件查询
User.find($or: [{ username: 'jack' }, { password: '666' }], (err, data) => {})

// 查询数据： 只查询一条数据，返回第一条符合条件的数据
User.findOne({ username: 'jack' }, (err, data) => {})


// 删除数据
User.remove({username: 'jack', password: '666'}, (err, data) => {})

User.findOneAndRemove({username: 'jack',password: '666'}, (err, data) => {})

User.findByIdAndRemove('6070052b9d23ce4a24eeeded', (err, data) => {})


// 更新数据
User.findByIdAndUpdate('6070052b9d23ce4a24eeeded', { password: '233333' }, (err, data) => {})

User.update({}, { password: '233333' }, (err, data) => {})

User.findOneAndUpdate({}, {password: '233333'}, (err, data) => {})

```


##### MySQL

```javascript

const mysql      = require('mysql');

// 1、 创建连接
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'testDB'
});
 
// 2、 连接数据库
connection.connect();
 

// 3、 执行数据操作

const sqlFunc = (sql) => {
  connection.query(sql, (error, results, fields) => {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
}

// 插入
sqlFunc('INSERT INTO students VALUES(NULL, "jack", 20, 0, "吃饭,打豆豆")')

sqlFunc('INSERT INTO students(name, age, hobbise) VALUES("coco", 16, "打豆豆")')

sqlFunc('INSERT INTO students(name, age, hobbise) VALUES("benla", 15, "打豆豆22"),("edwo", 17, "打豆豆33")')


// 更新
sqlFunc('UPDATE students SET gender=1,name="dony" where id=3')


// 删除
sqlFunc('delete from students where id=3')


// 查询
sqlFunc('SELECT * FROM students')


// 4、 关闭连接
connection.end();

```
