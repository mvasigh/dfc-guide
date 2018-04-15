const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  categories: [String],
  content: String
});

module.exports = mongoose.model('Item', itemSchema);
