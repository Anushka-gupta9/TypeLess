const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db");
const app = express();

connectDB();
// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("TypeLess backend is running 🚀");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
