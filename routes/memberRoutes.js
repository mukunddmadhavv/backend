const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// ✅ Register Member (ownerMobile comes from frontend)
router.post('/', async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      moneyPaid,
      dateJoined,
      planValidity,
      ownerMobile, // ✅ from frontend
    } = req.body;

    if (!ownerMobile || !fullName || !mobile || !moneyPaid || !dateJoined || !planValidity) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newMember = new Member({
      fullName,
      mobile,
      email,
      moneyPaid,
      dateJoined,
      planValidity,
      ownerMobile,
    });

    await newMember.save();
    res.status(201).json({ message: 'Member registered successfully' });
  } catch (error) {
    console.error('❌ Error creating member:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Get Members (by ownerMobile in query param)
router.get('/', async (req, res) => {
  const { ownerMobile } = req.query;

  if (!ownerMobile) {
    return res.status(400).json({ message: 'Missing ownerMobile in query' });
  }

  try {
    const members = await Member.find({ ownerMobile });
    res.status(200).json(members);
  } catch (err) {
    console.error('❌ Error fetching members:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
