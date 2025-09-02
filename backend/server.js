// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./models/db");   // bring Mongo connection
const User = require("./models/user");      // bring User model

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// connect to MongoDB
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("TypeLess backend is running ");
});

// add user data (save to Mongo)
app.post("/api/users", async (req, res) => {
  console.log("received body",req.body);
  try {
    const user = new User(req.body);   // create a new user doc
    await user.save();                 // save to MongoDB
    res.status(201).json({ message: "User saved successfully!", user });
  } catch (err) {
    console.error("error",error.message);
    res.status(400).json({ message: "Error saving user", error: err.message });
  }
});

// get all users (fetch from Mongo)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();   // fetch all from MongoDB
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// delete all users
app.delete("/api/users", async (req, res) => {
  try {
    await User.deleteMany();           // delete all in MongoDB
    res.json({ message: "All users deleted!" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting users" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
