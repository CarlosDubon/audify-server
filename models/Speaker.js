const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SpeakerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  photo: {
    type: String
  },
  sound: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Speaker", SpeakerSchema);