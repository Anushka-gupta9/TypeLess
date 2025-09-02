const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");

// GET all users
router.get("/users", dashboardController.getUsers);

// POST new user
router.post("/users", dashboardController.createUser);

// DELETE user by ID
router.delete("/users/:id", dashboardController.deleteUser);

module.exports = router;
