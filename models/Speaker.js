const mongoose = require("mongoose");
const { SPEAKERS } = require("@app/constants");
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
  radius: {
    type: Number, 
    required: true
  },
  photo: {
    type: String
  },
  sound: {
    type: String,
    required: true,
  },
  type: {
    type: {
      name: String,
      id: Number
    },
    enum: SPEAKERS.ID_FUNCTIONS,
    required: true, 
    index: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Speaker", SpeakerSchema);