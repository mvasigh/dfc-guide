const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: {
    name: String,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }
  },
  tags: [String],
  content: String
});

module.exports = mongoose.model('Item', itemSchema);
