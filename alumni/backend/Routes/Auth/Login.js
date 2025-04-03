import express from "express";
import pool from "../../Config/db.js";
const router = express();
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const getUserPass = await db.getUserPass(username);
  const dbPassword = getUserPass[0]["password"];
  const id = getUserPass[0]['admin_id'];  
  if (getUserPass.length > 0) {
    
    if (dbPassword === password) {
      return res.status(200).json({ success: 1, message: "Login successfully !" , id:id});
    } else {
      return res.status(200).json({ success: 0, message: "Invalid password !" });
    }
  } else {
    return res.status(200).json({ success: 0, message: "User not found !" });
  }
});
var db = {
  getUserPass: async (username) => {
    try {
      const [rows] = await pool.execute("SELECT password , admin_id FROM admin WHERE username = ?",[username]);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};
export default router;
