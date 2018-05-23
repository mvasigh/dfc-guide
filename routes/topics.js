const express = require('express');
const router = express.Router({ mergeParams: true });

const Topic = require('../models/Topic');

// NEW
router.get('/new', (req, res) => {
  res.render('topic/new');
});

// CREATE
router.post('/', (req, res) => {
  const title = req.sanitize(req.body.topic.title);

  Topic.create({ title: title })
    .then(topic => {
      console.log(topic);
      res.redirect('/guides');
    })
    .catch(err => console.log(err));
});

module.exports = router;
