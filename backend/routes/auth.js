const express = require('express');
const routes = express.Router();  // exports the route method

// POST - /api/auth/signup
routes.post("/signup",signup);
 
// POST- /api/auth/login
routes.post("/login", login);

export default routes;
