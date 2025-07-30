const Member = require('../models/Member');
const BusinessOwner = require('../models/BusinessOwner');

// 📌 Register a new member
const registerMember = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      moneyPaid,
      profilePic,
      dateJoined,
      planValidity,
      ownerMobile // ✅ comes from frontend (localStorage)
    } = req.body;

    if (!ownerMobile) {
      return res.status(400).json({ message: 'Owner mobile number is required' });
    }

    // 🔍 Find owner by mobile
    const owner = await BusinessOwner.findOne({ mobile: ownerMobile });
    if (!owner) {
      return res.status(404).json({ message: 'Business owner not found' });
    }

    const newMember = new Member({
      fullName,
      mobile,
      email,
      profilePic,
      moneyPaid,
      dateJoined,
      planValidity,
      businessOwner: owner._id // ✅ Reference to owner
    });

    await newMember.save();
    res.status(201).json({ message: 'Member registered successfully', member: newMember });
  } catch (error) {
    console.error('❌ Error registering member:', error);
    res.status(500).json({ message: 'Failed to register member' });
  }
};

// 📌 Get all members for logged-in owner
const getAllMembers = async (req, res) => {
  try {
    const { ownerMobile } = req.query; // 📌 From query param

    if (!ownerMobile) {
      return res.status(400).json({ message: 'Owner mobile number is required' });
    }

    const owner = await BusinessOwner.findOne({ mobile: ownerMobile });
    if (!owner) {
      return res.status(404).json({ message: 'Business owner not found' });
    }

    const members = await Member.find({ businessOwner: owner._id }).sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (error) {
    console.error('❌ Error fetching members:', error);
    res.status(500).json({ message: 'Failed to fetch members' });
  }
};

module.exports = {
  registerMember,
  getAllMembers,
};
