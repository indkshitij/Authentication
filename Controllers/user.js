const userCollection = require("../Modals/user.js");
const bcrypt = require("bcrypt");

const sendCookie = require("../Utils/features.js");

// Adding New Users OR Register
const addNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await userCollection.findOne({ email });

  if (user)
    return res.status(404).json({
      success: false,
      message: "User Already Exist",
    });

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await userCollection.create({ name, email, password: hashedPassword });

  sendCookie(user, res, "Registered Successfully", 201);
};

// Login
const login = async (req, res, next) => {
  try {
//  console.log(process.env.NODE_ENV)
    const { name, email, password } = req.body;

    const user = await userCollection
      .findOne({ email: email })
      .select("+password");

    if (!user)
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(404).json({
        success: false,
        message: "Invalid Email or Password",
      });

    sendCookie(user, res, `Welcome ${user.name}`, 200);
  } catch {
    next(new ErrorHandler("unable to process your request", 404));
  }
};

// Get My Profile

const getMyProfile = (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
};

// Finding All Users
const getAllUsers = async (req, res) => {
  const User = await userCollection.find({});

  res.json({
    success: true,
    User,
  });
};

// Find User By Name

const getUserByName = async (req, res) => {
  const userName = req.params.name;

  try {
    const user = await userCollection.findOne({ name: userName }); // Query the user model to find a user by name

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        user: user,
      });
    }
  } catch (error) {
    next(new ErrorHandler("Error retrieving user details", 404));
  }
};

// Remove User

const removeUser = async (req, res) => {
  const userName = req.params.userName;

  try {
    const user = await userCollection.findOneAndRemove({ name: userName });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User removed successfully",
        user: user,
      });
    }
  } catch (error) {
    next(new ErrorHandler("Error Removing User", 500));
  }
};

const logout = (req, res) => {
  
  res
    .status(200)
    .cookie("token", {
      expire: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};

module.exports = {
  addNewUser,
  login,
  getMyProfile,
  getAllUsers,
  getUserByName,
  removeUser,
  logout,
};
