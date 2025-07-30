const BusinessOwner = require('../models/BusinessOwner');
const bcrypt = require('bcrypt');

// ✅ Register Controller
exports.registerBusinessOwner = async (req, res) => {
  try {
    const { businessName, mobile, password } = req.body;

    if (!businessName || !mobile || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingOwner = await BusinessOwner.findOne({ mobile });
    if (existingOwner) {
      return res.status(400).json({ message: 'Mobile already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newOwner = new BusinessOwner({
      businessName,
      mobile,
      password: hashedPassword,
    });

    await newOwner.save();
    res.status(201).json({ message: 'Business owner registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// ✅ Login Controller (no JWT)
exports.loginBusinessOwner = async (req, res) => {
  try {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
      return res.status(400).json({ message: 'Mobile and password are required' });
    }

    const owner = await BusinessOwner.findOne({ mobile });
    if (!owner) {
      return res.status(404).json({ message: 'Business owner not found' });
    }

    const isMatch = await bcrypt.compare(password, owner.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ No JWT – return owner data only
    res.status(200).json({
      message: 'Login successful',
      owner: {
        _id: owner._id,
        businessName: owner.businessName,
        mobile: owner.mobile,
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};
