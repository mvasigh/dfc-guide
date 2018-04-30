const mongoose = require('mongoose');
const Item = require('./item');

const categorySchema = new mongoose.Schema({
  name: String,
  items: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model('Category', categorySchema);
