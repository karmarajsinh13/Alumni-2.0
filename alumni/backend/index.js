import express, { json } from 'express';
import cors from 'cors';
import db from './Config/db.js'; 
const app = express();

// Authentication
import Login from "./Routes/Auth/Login.js";
import GetAdmin from "./Routes/User/GetAdmin..js";

app.use(json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

//Authentication
app.use("/api/Login",Login);
app.use("/api/GetAdmin",GetAdmin)


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