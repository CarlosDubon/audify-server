const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const crypto = require('crypto');
const generatePassword = require("password-generator");


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  salt: String,
  validTokens: [String],
}, {
  timestamps: true
});

UserSchema.methods = {
  comparePassword: function (input) {
      return this.encryptPassword(input) === this.hashedPassword;
  },
  encryptPassword: function (password) {
      if (!password) return "";

      try {
          const encyptedPassword = crypto
              .createHash("sha256", this.salt)
              .update(password)
              .digest("hex");

          return encyptedPassword;
      } catch {
          return "";
      }
  },
  makeSalt: function () {
      return Math.round(new Date().valueOf() * Math.random()) + "";
  }
};

UserSchema.virtual("password").set(function (password=generatePassword(16, false)) {
  if (password === "") return;

  this.salt = this.makeSalt();
  this.hashedPassword = this.encryptPassword(password);
});

module.exports = Mongoose.model("User", userSchema);