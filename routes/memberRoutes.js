const express = require('express');
const router = express.Router();
const Member = require('../models/Member'); // Your Mongoose model

// POST /api/members - Register a new member
router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      moneyPaid,
      dateJoined,
      planValidity,
      // profilePic // skip for now
    } = req.body;

    const newMember = new Member({
      fullName,
      mobile,
      email,
      moneyPaid,
      dateJoined,
      planValidity,
    });

    await newMember.save();
    res.status(201).json({ message: 'Member registered successfully' });
  } catch (error) {
    console.error('❌ Error creating member:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET /api/members - Fetch all registered members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find();
    res.status(200).json(members);
  } catch (err) {
    console.error('❌ Error fetching members:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
