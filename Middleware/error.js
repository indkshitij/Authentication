class ErrorHandler extends Error{
constructor(message,statusCode){
    super(message);
    this.statusCode=statusCode;
}
}
errorMsg = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  return res.status(404).json({
    success: false,
    message: "Task Not Found",
  });
};
module.exports = {ErrorHandler,errorMsg,};
