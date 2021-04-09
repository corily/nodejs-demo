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
// const admin = new User({
//   username: 'jack',
//   password: '666',
//   email: '666@ad.com'
// })

// admin.save((err, data) => {
//   if (err) return cosole.log('保存失败')
//   console.log('保存成功');
//   console.log(data);
// })



// 查询数据： 无条件，返回所有数据
User.find((err, data) => {
  if (err) return console.log('查询失败');
  console.log('查询结果：')
  console.log(data) 
})

// 查询数据： 条件查询
// User.find({
//   username: 'jack',
//   password: '666'
// }, (err, data) => {
//   if (err) return console.log('查询失败');
//   console.log('查询结果：')
//   console.log(data) 
// })

// 查询数据： 只查询一条数据，返回第一条符合条件的数据
// User.findOne({
//   username: 'jack'
// }, (err, data) => {
//   if (err) return console.log('查询失败');
//   console.log('查询结果：')
//   console.log(data) 
// })


// 删除数据
// User.remove({
//   username: 'jack',
//   password: '666'
// }, (err, data) => {
//   if (err) return console.log('删除失败');
//   console.log('删除结果：')
//   console.log(data) 
// })

// User.findOneAndRemove({
//   username: 'jack',
//   password: '666'
// }, (err, data) => {
//   if (err) return console.log('删除失败');
//   console.log('删除结果：')
//   console.log(data) 
// })

// User.findByIdAndRemove('6070052b9d23ce4a24eeeded', (err, data) => {
//   if (err) return console.log('删除失败');
//   console.log('删除结果：')
//   console.log(data) 
// })




// 更新数据
// User.findByIdAndUpdate('6070052b9d23ce4a24eeeded', {
//   password: '233333'
// }, (err, data) => {
//   if (err) return console.log('更新失败');
//   console.log('更新结果：')
//   console.log(data) 
// })

// User.update({}, {
//   password: '233333'
// }, (err, data) => {
//   if (err) return console.log('更新失败');
//   console.log('更新结果：')
//   console.log(data) 
// })

// User.findOneAndUpdate({}, {
//   password: '233333'
// }, (err, data) => {
//   if (err) return console.log('更新失败');
//   console.log('更新结果：')
//   console.log(data) 
// })