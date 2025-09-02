const UserDashboard = require('../models/userdashboard');

exports.createEntry = async (req, res) => {
  try {
    const newEntry = new UserDashboard(req.body);
    await newEntry.save();
    res.status(201).json({ message: 'Dashboard entry saved!', data: newEntry });
  } catch (err) {
    res.status(400).json({ message: 'Error saving entry', error: err.message });
  }
};

exports.getAllEntries = async (req, res) => {
  try {
    const entries = await UserDashboard.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching entries', error: err.message });
  }
};
