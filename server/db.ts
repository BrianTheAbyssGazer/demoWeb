const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}).promise();

export async function getUser(email) {
    const result = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
    return result[0];
}

export async function registerUser(email, password, username) {
    console.log('registering...')
    try {
        const result = await pool.query('INSERT INTO user (email, password, username) VALUES (?,?,?)'
            , [email, password, username]);
        console.log('registering.')
        console.log(result)
        return true;
    }
    catch (err) {
        console.log(err)
        return false;
    }
}