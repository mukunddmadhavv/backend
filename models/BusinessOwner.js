const mongoose = require('mongoose');

const businessOwnerSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  password: { type: String, required: true },
dateJoined: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BusinessOwner', businessOwnerSchema);
