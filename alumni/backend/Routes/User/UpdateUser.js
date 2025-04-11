import express from "express";
import pool from "../../Config/db.js";
const router = express();
router.post("", async (req, res) => {
  console.log("________________",req.body);
 
  
});

var db = {
  
};
export default router;
