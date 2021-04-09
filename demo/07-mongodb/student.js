/*
  学生增删改查操作
*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/nodetest')

const studentsSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: Number,
    enum: [0, 1], // 枚举值 0：女   1：男
    default: 0
  },
  hobbies: {
    type: String
  }
})


const Student = mongoose.model('Student', studentsSchema)

module.exports = Student
