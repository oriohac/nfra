const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  refId: { type: String, unique: true },

  password: String,

  phone: String,
  state: String,
  gender: String,

  specialization: String,
  grade: String,
  lastGradeYear: Number,

  profilePhoto: String,
  dateOfBirth: String,
  lastLeagueOfficiated: String,

  zone: {
    type: String,
    default: ""
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },

  onboardingCompleted: {
    type: Boolean,
    default: false
  },

  resetPasswordToken: {
    type: String,
  },

  resetPasswordExpires: {
    type: Date,
  },

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);