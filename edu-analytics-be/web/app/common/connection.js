const queries = require('./queries');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE_NAME,
    multipleStatements: true
})

connection.connect((err) => {
    if (err) {
        console.log(`Failed to connect to db ${err}`)
    } else {
        console.log('Database connected');
        connection.query(queries.CREATE_TABLES, (err) => {
            if (err) {
                console.log(err.message);
            }
        })
    }
});

module.exports = connection;