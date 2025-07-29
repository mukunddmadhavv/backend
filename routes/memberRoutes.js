const express = require('express');
const router = express.Router();
const Member = require('../models/Member');
const authenticate = require('../middleware/auth'); // ✅ Import auth middleware

// ✅ POST /api/members - Register a new member (auth required)
router.post('/', authenticate, async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      moneyPaid,
      dateJoined,
      planValidity
    } = req.body;

    const newMember = new Member({
      fullName,
      mobile,
      email,
      moneyPaid,
      dateJoined,
      planValidity,
      businessOwner: req.user._id // ✅ Automatically associate the logged-in owner
    });

    await newMember.save();
    res.status(201).json({ message: 'Member registered successfully' });
  } catch (error) {
    console.error('❌ Error creating member:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET /api/members - Fetch all members of current owner (auth required)
router.get('/', authenticate, async (req, res) => {
  try {
    const members = await Member.find({ businessOwner: req.user._id });
    res.status(200).json(members);
  } catch (err) {
    console.error('❌ Error fetching members:', err);
    res.status(500).json({ error: err.message });
  }
});

// ❌ OPTIONAL/INSECURE: GET /api/members/:businessOwner - Public, remove if not needed
router.get('/:businessOwner', async (req, res) => {
  try {
    const { businessOwner } = req.params;
    const members = await Member.find({ businessOwner });
    res.status(200).json(members);
  } catch (err) {
    console.error('❌ Error fetching owner-specific members:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
