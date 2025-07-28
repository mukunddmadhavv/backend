const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  moneyPaid: {
    type: Number,
    required: true,
  },
  profilePic: String, // Cloudinary URL
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  planValidity: {
    type: Number, // in days or months
    required: true,
  }
});

module.exports = mongoose.model('Customer', customerSchema);
