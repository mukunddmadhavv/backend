const express = require('express');
const router = express.Router();
const BusinessOwner = require('../models/BusinessOwner');
const bcrypt = require('bcrypt');

// Register Route
router.post('/register', async (req, res) => {
  const { businessName, mobile, password } = req.body;

  try {
    const existingUser = await BusinessOwner.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ message: 'Mobile number already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new BusinessOwner({
      businessName,
      mobile,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed', error: err });
  }
});

// ✅ Login Route
router.post('/login', async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const user = await BusinessOwner.findOne({ mobile });
    if (!user) {
      return res.status(404).json({ message: 'Business owner not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', owner: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed', error: err });
  }
});

module.exports = router;
