const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  views: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now()
  },
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
