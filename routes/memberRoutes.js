const express = require('express');
const router = express.Router();
const Member = require('../models/Member'); // Your Mongoose model

// ✅ POST /api/members - Register a new member
router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      moneyPaid,
      dateJoined,
      planValidity,
      businessOwner // ✅ added
      // profilePic // skip for now
    } = req.body;

    const newMember = new Member({
      fullName,
      mobile,
      email,
      moneyPaid,
      dateJoined,
      planValidity,
      businessOwner // ✅ save this
    });

    await newMember.save();
    res.status(201).json({ message: 'Member registered successfully' });
  } catch (error) {
    console.error('❌ Error creating member:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET /api/members - Fetch all or owner-specific members
router.get('/', async (req, res) => {
  try {
    const { ownerId } = req.query;

    const members = ownerId
      ? await Member.find({ businessOwner: ownerId }) // ✅ Query filtering
      : await Member.find();

    res.status(200).json(members);
  } catch (err) {
    console.error('❌ Error fetching members:', err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ NEW: GET /api/members/:businessOwner - Fetch members of a specific business owner (alt)
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
