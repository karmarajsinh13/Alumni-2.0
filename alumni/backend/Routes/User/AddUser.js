import express from 'express';
import pool from '../../Config/db.js';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {  
        const unique_id = uuidv4().replace(/-/g, '');
        const ext = path.extname(file.originalname);
        const newFilename = `${unique_id}${ext}`;
        cb(null, newFilename);
    },
});

const upload = multer({ storage: storage });
const router = express.Router();

router.post("/", upload.single("photo"), async (req, res) => {
    try {
        const user_uuid = uuidv4().replace(/-/g, '');
        const {firstname, lastname, dob, email, phone, address,password, city, state, gender, passingYear, username} = req.body;
        
        const photoFileName = req.file ? req.file.filename : null;
        const date = new Date();



        const checkUserEmail = await db_function.checkUserEmail(email);
        if(checkUserEmail.length > 0){
            return res.status(200).json({
                success: 0,
                message: "Email Already Exist !"
            });
        } else{

        const checkUserMobile = await db_function.checkUserMobile(phone);
        if(checkUserMobile.length > 0){
            return res.status(200).json({
                success: 0,
                message: "Mobile Already Exist !"
            });
        }else{

            const checkUserUsername = await db_function.checkUserUsername(username);
            if(checkUserUsername.length > 0){
                return res.status(200).json({
                    success: 0,
                    message: "Username Already Exist !"
                });
            }else{
       
        const AddUser = await db_function.AddUser(
            user_uuid,
            firstname, lastname, dob, email, phone, address,
            password, city, state, gender, passingYear,
            photoFileName, username, date
        );
        
        if (AddUser > 0) {
            return res.status(200).json({
                success: 1,
                message: "Alumni Added Successfully",
                user_uuid: user_uuid 
            });
        } else {
            return res.status(200).json({
                success: 0,
                message: "Something went wrong, please try again!"
            });
        }
    }
}
        }
    } catch (error) {
        console.error("Error in user creation:", error);
        return res.status(500).json({
            success: 0,
            message: "Internal server error"
        });
    }
});

const db_function = {
    checkUserEmail:async(email)=>{
        const query = "SELECT * FROM user WHERE email=?";
        const values = [email];
        try {
            const [rows] = await pool.execute(query,values)
            return rows;
        } catch (error) {
            throw error;
        }
    },
    checkUserMobile:async(mobile)=>{
        const query = "SELECT * FROM user WHERE phone=?";
        const values = [mobile];
        try {
            const [rows] = await pool.execute(query,values)
            return rows;
        } catch (error) {
            throw error;
        }
    },
    checkUserUsername:async(username)=>{
        const query = "SELECT * FROM user WHERE username=?";
        const values = [username];
        try {
            const [rows] = await pool.execute(query,values)
            return rows;
        } catch (error) {
            throw error;
        }
    },
    AddUser: async (user_uuid, firstname, lastname, dob, email, phone, address,password, city, state, gender, passing_year,photo, username, date) => {

        const query = `INSERT INTO user (unique_id, firstname, lastname, dob, email, phone, address, password, city, state, gender, passing_year, photo, username, entry_date, status,updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
        
        const values = [
            user_uuid,
            firstname, lastname, dob, email, phone, address,
            password, city, state, gender, passing_year,
            photo, username, date, 1,date
        ];
        
        try {
            const [rows] = await pool.execute(query, values);
            return rows.insertId;
        } catch (error) {
            console.error("Database error:", error);
            throw error;
        }
    }
};

export default router;