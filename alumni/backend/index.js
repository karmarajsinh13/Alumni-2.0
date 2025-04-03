import express, { json } from 'express';
import cors from 'cors';
import db from './Config/db.js'; 
const app = express();

// Authentication
import Login from "./Routes/Auth/Login.js";

app.use(json());
app.use(cors());

//Authentication
app.use("/api/Login",Login);



async function checkDatabaseConnection() {
    try {
      // Try to execute a simple query to check the connection
      const [rows, fields] = await db.execute('SELECT 1');
      console.log('Database connection established ✅');
    } catch (err) {
      console.error('Failed to connect to the database ❌:', err.message);
    }
  }
  
  checkDatabaseConnection();

app.listen(5500,()=>{
    console.log("Server is running on 5500 port ✅ ")
})