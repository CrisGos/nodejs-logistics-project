import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'logistics',
    port: 3306,
    password: ''
  });


async function getConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Databse is up and running');
        // connection.release();
        return connection;
      } catch (err) {
        console.error(`Database connection failed: ${err}`);
        throw err;
      }
}

getConnection()

export { pool };
