/*
  学生增删改查操作
*/

const path = require('path');
const fs = require('fs');

const dbpath = path.resolve(__dirname, './db.json')

// 写入
const setStu = (data, callback) => {
  fs.writeFile(dbpath, JSON.stringify({students: data}), (err, data) => {
    if (err) return callback(err)
    callback(null, data)
  })
}

// 读取全部
const find = (callback) => {
  fs.readFile(dbpath, 'utf8', (err, data) => {
    if (err) return callback(err)
    callback(null, JSON.parse(data).students)
  })
}

// 读取某一个
const findById = (id, callback) => {
  fs.readFile(dbpath, 'utf8', (err, data) => {
    if (err) return callback(err)
    const stu = JSON.parse(data).students.find(v => v.id === id)
    callback(null, stu)
  })
}

// 添加
const add = (data, callback) => {
  find((err, students) => {
    if (err) return callback(err)
    const stu = {
      id: students[students.length - 1].id + 1,
      ...data,
      age: Number(data.age)
    }
    students.push(stu)
    setStu(students, (err, data) => {
      if (err) return callback(err)
      callback(null, data)
    })
  })
}

// 更新
const edit = (data, callback) => {
  find((err, students) => {
    if (err) return callback(err)
    students = students.map(v => {
      if (v.id === data.id) v = data
      return v
    })
    setStu(students, (err, data) => {
      if (err) return callback(err)
      callback(null, data)
    })
  })
}

// 删除
const del = (id, callback) => {
  find((err, students) => {
    if (err) return callback(err)
    const idx = students.findIndex(v => v.id === id)
    students.splice(idx, 1)
    setStu(students, (err, data) => {
      if (err) return callback(err)
      callback(null, data)
    })
  })
}

module.exports = {
  find,
  findById,
  add,
  edit,
  del
}
