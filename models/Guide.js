const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  title: String,
  description: String,
  topic: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic'
  },
  content: String
});

module.exports = mongoose.model('Guide', guideSchema);
