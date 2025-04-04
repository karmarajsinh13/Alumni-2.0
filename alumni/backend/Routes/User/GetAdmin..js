import express from "express";
import pool from "../../Config/db.js";
const router = express();
router.post("", async (req, res) => {
  const { admin_id } = req.body;

  const getAdminData = await db.getAdminData(admin_id);
  if (getAdminData.length > 0) {
    return res.status(200).json({ success: 1, admin: getAdminData });
  } else {
    return res.status(200).json({ success: 0, message: "No Data Found !!" });
  }
});
var db = {
  getAdminData: async (admin_id) => {
    const query = "SELECT * FROM admin WHERE admin_id=?";
    const value = [admin_id];
    try {
      const [rows] = await pool.execute(query, value);
      return rows;
    } catch (error) {
      throw error;
    }
  },
};
export default router;
