const Member = require('../models/Member');

// Create a new member
exports.registerMember = async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      moneyPaid,
      profilePic,
      dateJoined,
      planValidity
    } = req.body;

    const newMember = new Member({
      fullName,
      mobile,
      email,
      moneyPaid,
      profilePic,
      dateJoined,
      planValidity
    });

    await newMember.save();
    res.status(201).json({ message: "Member registered successfully", member: newMember });

  } catch (error) {
    console.error("❌ Error registering member:", error);
    res.status(500).json({ error: "Server error while registering member" });
  }
};

// Get all members (optional for listing)
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    console.error("❌ Error fetching members:", error);
    res.status(500).json({ error: "Server error while fetching members" });
  }
};
