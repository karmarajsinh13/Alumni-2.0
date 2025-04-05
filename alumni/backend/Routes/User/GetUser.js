import express from "express";
import pool from "../../Config/db.js";
const router = express();
router.post("", async (req, res) => {

  const getUserData = await db.getUserData();
  if (getUserData.length > 0) {
    return res.status(200).json({ success: 1, user: getUserData });
  } else {
    return res.status(200).json({ success: 0, message: "No Data Found !!" });
  }
});
var db = {
  getUserData: async () => {
    const query = "SELECT * FROM user";
    try {
      const [rows] = await pool.execute(query);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};
export default router;
