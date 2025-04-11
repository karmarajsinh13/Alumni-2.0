import express from 'express';
import pool from '../../Config/db.js';
import { v4 as uuidv4 } from 'uuid'
import path from 'path';
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {  
      const unique_id= uuidv4().replace(/-/g , '')
      const extreatfile = path.extname(file.originalname)
      const newFilename = `${unique_id}${extreatfile}`
      cb(null, newFilename);
    },
  });
  const upload = multer({ storage: storage });
const router = express();

router.post("/",upload.single("photo"),async(req,res)=>{

    console.log(req.body);
    const {firstname,lastname,dob,email,phone,address,password,city,state,gender,passingYear,username} = req.body;
    const photoFileName = req.file ? req.file.filename : null;
    console.log(photoFileName);
    
    const date = new Date();
    const AddUser = await db_function.AddUser(firstname,lastname,dob,email,phone,address,password,city,state,gender,passingYear,photoFileName,username,date)
    if(AddUser > 0){
      return res.status(200).json({success : 1 ,messge : "Alumni Added Successfully"})
    }else{
      return res.status(200).json({success : 0 ,messge : "Something went wrong , please try again !"})
    }
    
});
var db_function = {
  AddUser : async(firstname,lastname,dob,email,phone,address,password,city,state,gender,passing_year,photo,username,date)=>{
    console.log(firstname,lastname,dob,email,phone,address,password,city,state,gender,passing_year,photo,username,date)
    const query = "INSERT INTO user (firstname, lastname, dob, email, phone, address, password, city, state, gender, passing_year, photo,username, entry_date, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [firstname,lastname,dob,email,phone,address,password,city,state,gender,passing_year,photo,username,date,1];
    try {
      const [rows] = await pool.execute(query,values);
    
      return rows.insertId;
    } catch (error) {
      throw error;
    }

  }
}
export default router;