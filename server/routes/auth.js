const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');

router.get('/', (req, res) => {
  res.send('Auth route');
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
    if (password.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }

    // Check for existing user
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password
    });

    // Create hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        const savedUser = await newUser.save();
        res.status(201).json({
          user: {
            id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email
          }
        });
      });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password ) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    const isExist = await User.findOne({ email });
    if (!isExist) {
      return res.status(400).json({ msg: 'User does not exist' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, isExist.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create token
    const token = await isExist.generateAuthToken();

    res.status(200).json({
      user: {
        id: isExist.id,
        name: isExist.name,
        email: isExist.email
      },
      token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;