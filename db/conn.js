const mysql = require('mysql2')
const conn = mysql.createPool({
    connectionLimit: 10,
    host: 'sql111.infinityfree.com',
    user:'if0_37375923',
    password: '1g7kXDMoZwHbB',
    database: 'if0_37375923_pjsenai	',
    port: 3306
})

module.exports = conn