// models/guestModel.js
const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
});

const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;
