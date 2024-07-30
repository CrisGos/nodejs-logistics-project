import mysql from 'mysql2/promise';

let pool;

try {
    pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      database: 'logistics',
      port: 3306,
      password: ''
    });
    console.log('Databse is up and running');
} catch (err) {
    console.error(`Database connection failed: ${err}`);
    throw err;
}

export { pool };

