const express = require("express");
const router = express.Router();

const userControllers = require("../Controllers/user.js");

const isAuthenticated = require("../Middleware/auth.js");

router.get("/user/allUsers", userControllers.getAllUsers);

router.post("/user/add", userControllers.addNewUser);

router.get("/user/find/:name", userControllers.getUserByName);

router.put("/user/remove/:userName", userControllers.removeUser);

router.post("/user/login", userControllers.login);

router.get("/user/me", isAuthenticated, userControllers.getMyProfile);

router.get("/user/logout", isAuthenticated, userControllers.logout);

module.exports = router;
