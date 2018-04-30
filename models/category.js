const mongoose = require('mongoose');
const Item = require('./item');

const categorySchema = new mongoose.Schema({
  name: String,
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item'
    }
  ]
});

module.exports = mongoose.model('Category', categorySchema);
