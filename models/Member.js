const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  moneyPaid: { type: Number, required: true },
  dateJoined: { type: Date, required: true },
  planValidity: { type: String, required: true },
businessOwner: { type: String, required: true },
  // profilePic: { type: String } // Skipped for now
});

module.exports = mongoose.model('Member', memberSchema);
