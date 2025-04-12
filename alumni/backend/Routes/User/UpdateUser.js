import express from "express";
import pool from "../../Config/db.js";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const unique_id = uuidv4().replace(/-/g, "");
    const ext = path.extname(file.originalname);
    const newFilename = `${unique_id}${ext}`;
    cb(null, newFilename);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Handle update with file upload capability
router.post("/", upload.fields([
  { name: 'existingPhoto', maxCount: 1 }
]), async (req, res) => {
  try {
    console.log("Received update data:", {
      body: req.body,
      files: req.files
    });

    // Combine data from form fields and files
    const formData = {
      ...req.body,
      photoFileName: req.files?.photo?.[0]?.filename || req.body.existingPhoto || null
    };

    const {
      id,
      firstname,
      lastname,
      username,
      password,
      address,
      dob,
      email,
      phone,
      passingYear,
      gender,
      city,
      state
    } = formData;

    // Validate required fields
    if (!id) {
      return res.status(400).json({ success: 0, message: "User ID is required" });
    }

    // Update user in database
    const updateResult = await db.updateUser(id,firstname,lastname,username,password,address,dob,email,phone,passingYear,gender,city,state,formData.photoFileName);

    if (updateResult > 0) {
      return res.status(200).json({ success: 1, message: "User updated successfully" });
    } else {
      return res.status(200).json({ success: 0, message: "User not found or no changes made" });
    }

  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({ success: 0, message: "Internal server error" });
  }
});

const db = {
  updateUser: async (id,firstname,lastname,username,password,address,dob,email,phone,passingYear,gender,city,state,photo) => {
    const query = `UPDATE user SET firstname = ?,lastname = ?,username = ?,password = ?,address = ?,dob = ?,email = ?,phone = ?,passing_year = ?,gender = ?,city = ?,state = ?,photo = COALESCE(?, photo),updated_at = NOW()WHERE user_id = ?`;
    
    const values = [firstname,lastname,username,password,address,dob,email,phone,passingYear,gender,city,state,photo,id];

    try {
      const [result] = await pool.execute(query, values);
      return result.affectedRows;
    } catch (error) {
      console.error("Database update error:", error);
      throw error;
    }
  }
};

export default router;