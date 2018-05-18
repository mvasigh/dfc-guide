const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  title: String,
  content: String
});

module.exports = mongoose.model('Guide', guideSchema);
