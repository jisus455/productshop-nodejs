const mysql = require('promise-mysql')

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
}

const connection = mysql.createConnection(dbConfig)

function getConnection(){
    return connection
}

module.exports = getConnection