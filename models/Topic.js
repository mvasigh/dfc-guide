const mongoose = require('mongoose');
const Guide = require('./Guide');

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Untited'
  },
  guides: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Guide'
    }
  ]
});

module.exports = mongoose.model('Topic', topicSchema);
