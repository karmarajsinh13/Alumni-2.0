import mysql from 'mysql2/promise';

// Create a connection pool to the database
const pool = mysql.createPool({
  host: 'localhost',  // replace with your host
  user: 'root',       // replace with your database username
  password: '', // replace with your database password
  database: 'gurukulalumni', // replace with your database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Export as default
export default pool;
