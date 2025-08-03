const express = require('express');
const router = express.Router();
const BusinessOwner = require('../models/BusinessOwner');
const Member = require('../models/Member');

// GET all business owners with date joined
router.get('/', async (req, res) => {
  try {
    const owners = await BusinessOwner.find().sort({ dateJoined: -1 });
    res.status(200).json(owners);
  } catch (err) {
    console.error('Error fetching business owners:', err);
    res.status(500).json({ message: 'Failed to fetch business owners' });
  }
});

// GET all members for a specific business owner by mobile number
router.get('/:mobile/members', async (req, res) => {
  try {
    const mobile = req.params.mobile;
    const members = await Member.find({ ownerMobile: mobile }).sort({ dateJoined: -1 });
    res.status(200).json(members);
  } catch (err) {
    console.error('Error fetching members for owner:', err);
    res.status(500).json({ message: 'Failed to fetch members for this business owner' });
  }
});

module.exports = router;
