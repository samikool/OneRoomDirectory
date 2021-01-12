require('dotenv').config()

const mariadb = require('mariadb')
const pool = mariadb.createPool({
    host: "localhost",
    user: process.env.dbname,
    password: process.env.dbpass,
    database: "oneRoomDirectory"
})

async function getLinks(){
    let con = await pool.getConnection()
    let rows = await con.query('SELECT * FROM `domains`')
    return rows;
}

module.exports = {getLinks};