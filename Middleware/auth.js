const userCollection = require("../Modals/user");

const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Login First",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await userCollection.findById(decoded._id);

  next();
};

module.exports = isAuthenticated;
