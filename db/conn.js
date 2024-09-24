const mysql = require('mysql2')
const conn = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql.railway.internal',
    user:'root',
    password: 'cJcXlpoktScxyXbnHpEIewuhNvhvLBbi',
    database: 'railway',
    port: 3306
})

module.exports = conn