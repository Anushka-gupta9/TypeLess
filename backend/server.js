const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./models/db"); 
const authRoutes = require("./routes/auth");

const app = express();

// connect to MongoDB
connectDB();


// Middleware
app.use(cors());
app.use(express.json());
//temporary database
let users=[];


// test route
app.get("/", (req, res) => {
  res.status(200).json({message: "Typeless backend is running" }); // to test get method -> successful ~
});
//add user data
app.post("/api/users",(req,res) => 
{
  const user = req.body;
  users.push(user);
  res.status(201).json({ message:"user saved sucessfully!",user});
});

//get all users
app.get("/api/users",(req,res)=>{
  res.json(users);
});
//delete all users
app.delete("/api/users",(req,res) => 
{
  users =[];
  res.json({message :"all users deleted!"});
});

// auth routes
app.use("/api/auth", authRoutes); 


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
