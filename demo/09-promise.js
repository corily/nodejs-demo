// const p1 = new Promise((resolve, reject) => {
//   // resolve('ok11')
//   setTimeout(() => {
//     reject('error22')
//     // resolve('ok11')
//   }, 1000);
//   console.log(111)
// })

// p1
//   .then((res) => {
//     console.log(222, res)
//   })
//   .catch(err => {
//     console.log(333, err)
//   })




// const p2 = new Promise((resolve, reject) => {
//   resolve('ok11')
//   // reject('error22')
// })

// const result = p2.then((res) => {
//     // 1、 抛出异常： result 状态 rejected
//     // throw 'error'

//     // 2、 返回结果是 非 Promise 对象：result 状态 fulfilled
//     // return 123

//     // 3、 返回结果是 Promise 对象： result 状态根据其结果变化
//     return new Promise((resolve, reject) => {
//       resolve('ok') // result 状态 fulfilled
//       // reject('err') // result 状态 rejected 
//     })
//   }).catch(err => {
//     console.log(333, err)
//   })

// console.log(result)




let data = 1

const p3 = new Promise((resolve, reject) => {
  resolve('ok11')
  data = 2
  // reject('error22')
})

const result = p3.then((res) => {
    data = 3
    // 1、 抛出异常： result 状态 rejected
    // throw 'error'

    // 2、 返回结果是 非 Promise 对象：result 状态 fulfilled
    // return 123

    // 3、 返回结果是 Promise 对象： result 状态根据其结果变化
    return new Promise((resolve, reject) => {
      resolve('ok') // result 状态 fulfilled
      // reject('err') // result 状态 rejected 
      data = 4
    })
  }).catch(err => {
    // console.log(333, err)
  })

// console.log(result)
console.log(data)