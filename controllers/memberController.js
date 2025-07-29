// Register a member
const registerMember = async (req, res) => {
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

    // Validate required fields
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized. Business owner not found.' });
    }

    const newMember = new Member({
      fullName,
      mobile,
      email,
      moneyPaid,
      profilePic,
      dateJoined,
      planValidity,
      businessOwner: req.user._id, // ✅ Link member to logged-in business owner
    });

    await newMember.save();
    res.status(201).json({ message: 'Member registered successfully', member: newMember });
  } catch (error) {
    console.error('Error registering member:', error);
    res.status(500).json({ message: 'Failed to register member' });
  }
};

// Get all members for logged-in business owner
const getAllMembers = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized. Business owner not found.' });
    }

    const members = await Member.find({ businessOwner: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: 'Failed to fetch members' });
  }
};

module.exports = {
  registerMember,
  getAllMembers,
};
