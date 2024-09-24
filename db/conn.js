const mysql = require('mysql2')
const conn = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user:'root',
    password: 'root',
    database: 'pjsenai'
})

module.exports = conn