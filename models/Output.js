const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OutputSchema = new Schema({
  device: {
    type: String,
    required: true
  },
  channels: {
    type: [Number],
    default: []
  },
  userIn: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null
  },
  lastTime: {
    type: Date,
    default: null
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model("Output", OutputSchema);