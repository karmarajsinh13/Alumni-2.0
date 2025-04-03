import express, { json } from 'express';
import cors from 'cors';
const app = express();

app.use(json());
app.use(cors());


app.listen(5500,()=>{
    console.log("Server is running on 5500 port ✅ ")
})