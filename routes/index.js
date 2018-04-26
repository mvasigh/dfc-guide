const express = require('express');
const router = express.Router({ mergeParams: true });
const Item = require('../models/item');

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      res.render('home', {
        items: []
      });
    } else {
      res.render('home', {
        items: items
      });
    }
  });
});

module.exports = router;
