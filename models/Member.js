const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  moneyPaid: { type: Number, required: true },
  dateJoined: { type: Date, required: true },
  planValidity: { type: String, required: true },
  ownerMobile: { type: String, required: true } // ✅ new field replacing businessOwner
  // profilePic: { type: String } // Optional future feature
});

module.exports = mongoose.model('Member', memberSchema);
