const express = require('express')
const fs = require('fs');
const path = require('path');

const students = require('./student')

const router = express.Router()

router
  .get('/', (req, res) => {
    students.find((err, data) => {
      if (err) return res.send('获取学生信息失败' + err)
      res.render(path.join(__dirname, './tpl/index.html'), {students: data})
    })
  })
  .get('/students', (req, res) => {
    students.find((err, data) => {
      if (err) return res.send('获取学生信息失败' + err)
      res.render(path.join(__dirname, './tpl/index.html'), {students: data})
    })
  })
  .get('/students/new', (req, res) => {
    res.render(path.join(__dirname, './tpl/new.html'))
  })
  .post('/students/new', (req, res) => {
    students.add(req.body, (err) => {
      if (err) return res.send(err)
      res.redirect('/')
    })
  })
  .get('/students/edit', (req, res) => {
    students.findById(Number(req.query.id), (err, data) => {
      if (err) return res.send(err)
      res.render(path.join(__dirname, './tpl/edit.html'), {data})
    })
    
  })
  .post('/students/edit', (req, res) => {
    req.body.id = Number(req.body.id)
    req.body.age = Number(req.body.age)
    students.edit(req.body, (err) => {
      if (err) return res.send(err)
      res.redirect('/')
    })
  })
  .get('/students/delete', (req, res) => {
    students.del(Number(req.query.id), (err) => {
      if (err) return res.send(err)
      res.redirect('/')
    })
  })
  // .get('*', (req, res) => {
  //   res.send('404 Not Found')
  // })

module.exports = router