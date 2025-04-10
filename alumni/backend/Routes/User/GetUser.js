import express from "express";
import pool from "../../Config/db.js";
const router = express();
router.post("", async (req, res) => {
  const id = req.body?.id || 0;
  let getUser;

  try {
    const getUsersData = await db.getUsersData();

    if (parseInt(id) > 0) {
      getUser = await db.getUser(id);
    } else {
      getUser = [];
    }

    if (getUsersData.length > 0) {
      return res.status(200).json({
        success: 1,
        user: getUsersData,
        singleuser: getUser[0] || {},
      });
    } else {
      return res.status(200).json({
        success: 0,
        message: "No Data Found !!",
      });
    }
  } catch (err) {
    console.error("Error fetching user data:", err);
    return res.status(500).json({
      success: 0,
      message: "Server error occurred",
    });
  }
});

var db = {
  getUser: async (id) => {
    const query = "SELECT * FROM user WHERE user_id=?";
    const values = [id];
    try {
      const [rows] = await pool.execute(query,values);
      return rows;
    } catch (error) {
      throw error;
    }
  },
  getUsersData: async () => {
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
