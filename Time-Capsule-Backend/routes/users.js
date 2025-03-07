const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Userdata = require('../models/Userdata');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/AuthMiddleware')

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, firstName, lastName, about, password } = req.body;
  const existingUserMail = await User.findOne({ email });
  const existingUserName = await User.findOne({ username });

  if (existingUserName) {
    return res.status(400).json({ message: `Username ${username} is not available` });
  }
  if (existingUserMail) {
    return res.status(400).json({ message: `This email is already registered` });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username,
    email,
    firstName,
    lastName,
    about,
    password : hashedPassword,
  });

  try {
    const newUser = await user.save();

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ message: 'User registered successfully', token, username });
  } catch (err) {
    res.status(400).json({"Error":"Error in token", message: err.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
    const username = user.username;

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, username });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Get user profile
// Get user data by username
router.get('/profile/:username', authMiddleware, async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username }).select('-password');
    // console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found...' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
