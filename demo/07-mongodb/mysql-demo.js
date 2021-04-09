const mysql = require('mysql');

// 1、 创建连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'students',
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
// sqlFunc('INSERT INTO students VALUES(NULL, "jack", 20, 0, "吃饭,打豆豆")')
// sqlFunc('INSERT INTO students(name, age, hobbise) VALUES("coco", 16, "打豆豆")')
// sqlFunc('INSERT INTO students(name, age, hobbise) VALUES("benla", 15, "打豆豆22"),("edwo", 17, "打豆豆33")')


// 更新
// sqlFunc('UPDATE students SET gender=1,name="dony" where id=3')


// 删除
sqlFunc('delete from students where id=3')


// 查询
sqlFunc('SELECT * FROM students')


// 4、 关闭连接
connection.end();
