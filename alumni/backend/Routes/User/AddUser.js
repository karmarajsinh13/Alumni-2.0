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
    const photoFileName = req.file ? req.file.filename : null;

    
});
export default router;