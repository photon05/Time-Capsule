const mongoose = require('mongoose');

const userDataSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  about: {type: String},
});


const Userdata = mongoose.model('Userdata', userDataSchema);

module.exports = Userdata;
