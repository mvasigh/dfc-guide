const express = require('express'),
  router = express.Router({ mergeParams: true }),
  _ = require('lodash');

const Topic = require('../models/Topic');

// NEW
router.get('/new', (req, res) => {
  res.render('topic/new');
});

// CREATE
router.post('/', (req, res) => {
  const title = _.startCase(req.sanitize(req.body.topic.title));

  Topic.create({ title: title })
    .then(topic => {
      res.redirect('/guides');
    })
    .catch(err => console.log(err));
});

module.exports = router;
