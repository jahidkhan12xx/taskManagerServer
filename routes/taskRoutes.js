const express = require("express");
const {
  addTask,
  getTask,
  deleteTask,
  getSingleTask,
  updateTask,
} = require("../controllers/taskController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.post("/addtask", addTask);
router.get("/gettask", verifyToken, getTask);
router.get("/gettask/:id", verifyToken, getSingleTask);
router.delete("/deletetask/:id", deleteTask);
router.patch("/update/:id", updateTask);

module.exports = router;
