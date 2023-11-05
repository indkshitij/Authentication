const express = require("express");

const router = express.Router();

const taskControllers = require("../Controllers/task.js");

const isAuthenticated = require("../Middleware/auth.js");

router.post("/task/new", isAuthenticated, taskControllers.newTask);

router.get("/task/getTask", isAuthenticated, taskControllers.getMyTask);

router.put("/task/:id", isAuthenticated, taskControllers.updateTask);

router.delete("/task/:id", isAuthenticated, taskControllers.deleteTask);

module.exports = router;