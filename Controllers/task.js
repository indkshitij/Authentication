const { ErrorHandler } = require("../Middleware/error.js");
const taskCollection = require("../Modals/task.js");

// Add new Task

const newTask = async (req, res, next) => {
  const { title, description } = req.body;

  try {
    const task = await taskCollection.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task Added Successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating task",
      error: error.message,
    });
  }
};

// Get My Task

const getMyTask = async (req, res, next) => {
  const userID = req.user._id;

  const taskNeeded = await taskCollection.find({ user: userID });

  res.status(201).json({
    success: true,
    taskNeeded,
  });
};

// Update Task

const updateTask = async (req, res, next) => {
  const id = req.params.id;

  try {
    const task = await taskCollection.findById(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }
    task.isCompleted = !task.isCompleted;

    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated",
      task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating task",
      error: error.message,
    });
  }
};

// Delete Task

const deleteTask = async (req, res, next) => {
  const id = req.params.id;

  try {
    const task = await taskCollection.findById(id);

    if (!task) {
      return next(new ErrorHandler("task not found",404));
    }

    await taskCollection.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    res.status(201).json({
      success: false,
      message: "Task Unable To Delete",
      error: error.message,
    });
  }
};

module.exports = { newTask, getMyTask, updateTask, deleteTask };
