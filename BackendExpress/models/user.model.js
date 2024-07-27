const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String },
  email: { type: String, unique: true, required: true },
  phoneNumber: { type: String, required: false, default: null },
  firstName: { type: String },
  lastName: { type: String },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ["Male", "Female", "Other"] },
  accountCreationDate: { type: Date, default: Date.now },
  lastLoginDate: { type: Date },
  accountStatus: { type: String, enum: ["Active", "Inactive", "Banned"], default: "Active" },
  googleId: { type: String, unique: true, required: false },
  role: { type: String, enum: ["Admin", "User", "Guest"], default: "User" },
  picture: { type: String },
  //passwordSalt: { type: String, required: true },
  securityQuestions: [
    {
      question: { type: String },
      answerHash: { type: String },
    },
  ],
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
  },
  languagePreference: { type: String, default: "en" },
  timeZone: { type: String },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    sms: { type: Boolean, default: false },
    push: { type: Boolean, default: false },
  },
  lastActivityDate: { type: Date },
  loginHistory: [
    {
      timestamp: { type: Date, default: Date.now },
      ipAddress: { type: String },
      device: { type: String },
    },
  ],
  purchaseHistory: [
    {
      purchaseDate: { type: Date },
      items: [
        {
          itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          quantity: { type: Number },
        },
      ],
    },
  ],
  subscriptionStatus: { type: String },
  profilePictureUrl: { type: String },
  //   bio: { type: String },
  //   websiteUrl: { type: String },
  socialMediaLinks: {
    facebook: { type: String },
    twitter: { type: String },
    instagram: { type: String },
  },
  //customAttributes: { type: Schema.Types.Mixed }, // Flexible field for custom attributes
});

const User = mongoose.model("User", userSchema);

module.exports = User;
