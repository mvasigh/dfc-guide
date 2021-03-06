const mongoose = require('mongoose');
const Guide = require('./Guide');

const topicSchema = new mongoose.Schema({
  title: {
    type: String,
    default: 'Untitled'
  },
  index: {
    type: Number,
    default: 10
  },
  guides: [
    {
      title: String,
      description: String,
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guide'
      }
    }
  ]
});

module.exports = mongoose.model('Topic', topicSchema);
