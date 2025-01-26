const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

// Connect to the database
connectDB();

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// Root route to welcome users
app.get("/", (req, res) => {
  res.send("Welcome to Meaffe!");
});

// Route for handling user-related API requests
app.use("/api/user", require("./routes/user"));
// app.use("/api/machine", require('./routes/machine'));
app.use("/api/image", require("./routes/image"));
app.use(errorHandler);
// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
