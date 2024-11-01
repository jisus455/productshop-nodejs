const postgresql = require('pg')

const connection = new postgresql.Pool({
    connectionString: process.env.DATABASE_URL
})

function getConnection(){
    return connection
}

module.exports = getConnection