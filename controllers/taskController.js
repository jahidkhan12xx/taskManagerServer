const Task = require("../models/Task");

const addTask = async (req, res) => {
  const task = req.body;

  try {
    const result = await Task.create(task);
    res.status(201).json({
      status: "success",
      message: "Task Added",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getTask = async (req, res) => {
  const user_id = req.userId;

  try {
    const data = await Task.find({ userId: user_id }).sort({ createdAt: -1 });
    res.status(201).json({
      status: "success",
      message: "Here is Your taskList",
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleTask = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await Task.findById(id);

    res.status(201).json({
      status: "success",
      message: "Here is Your task",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (req, res) => {
  const task_id = req.params.id;

  try {
    const result = await Task.deleteOne({ _id: task_id });
    res.status(201).json({
      status: "success",
      message: "You task deleted",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  const task_id = req.params.id;
  const updatedData = req.body;

  try {
    const result = await Task.findByIdAndUpdate(
      { _id: task_id },
      {
        name: updatedData?.name,
        description: updatedData?.description,
        date: updatedData?.date,
      }
    );
    res.status(201).json({
      status: "success",
      message: "You task deleted",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addTask,
  getTask,
  deleteTask,
  getSingleTask,
  updateTask,
};
