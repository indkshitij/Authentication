// Intialise Express

const express = require("express");

const app = express();

module.exports = app;

const userRouter = require("./Routes/user.js");

const taskRouter = require("./Routes/task.js");

const cookieParser = require("cookie-parser");

const cors = require("cors");

// Middleware

app.use(express.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    method: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

// Env

const { config } = require("dotenv");

config({
  path: "./Data/config.env",
});

// Routes

app.use(userRouter);

app.use(taskRouter);

// Error Handling Middleware
const errorMsg = require("./Middleware/error.js");
app.use(errorMsg.errorMsg);
