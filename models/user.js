const mongoose = require("mongoose");
const plm = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // no duplicate emails
    lowercase: true,
  },
  
  
});

userSchema.plugin(plm);

// Export the model
module.exports = mongoose.model("User", userSchema);
