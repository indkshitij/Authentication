// Intialise Express

const app = require("./app.js");

const port = process.env.PORT;

// Database

const connectDB = require("./data/database.js") 

connectDB();

// Start the server after the database connection is established

app.listen(port, () => {
  console.log(`Server is working on ${port}`);
});
