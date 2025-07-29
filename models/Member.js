const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String },
  moneyPaid: { type: Number, required: true },
  dateJoined: { type: Date, required: true },
  planValidity: { type: String, required: true },
  businessOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessOwner',
    required: true,
  },
  // profilePic: { type: String } // You can enable this later
});

module.exports = mongoose.model('Member', memberSchema);
