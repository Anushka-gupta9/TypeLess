const express = require('express');
const routes = express.Router();  // exports the route method
const { signup, login } = require("../controllers/authcontroller");

// POST - /api/auth/signup
routes.post("/signup",signup);
 
// POST- /api/auth/login
routes.post("/login", login);

module.exports = routes ;
