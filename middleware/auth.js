const jwt = require('jsonwebtoken');
const BusinessOwner = require('../models/BusinessOwner');

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const businessOwner = await BusinessOwner.findById(decoded.id);

    if (!businessOwner) {
      return res.status(401).json({ message: 'Business owner not found' });
    }

    req.user = businessOwner; // ✅ Attach owner info to request
    next();
  } catch (err) {
    console.error('Auth error:', err);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authenticate;
