const express = require('express');
const router = express.Router({ mergeParams: true });
const Item = require('../models/item');

// NEW - show new item page
router.get('/new', (req, res) => {
  res.render('item/new');
});

router.post('/', (req, res) => {
  console.log(req.body);
  Item.create(req.body.item, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Created a new item', item);
      res.render('home');
    }
  });
});

// SHOW - show item by id
router.get('/:id', (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('item/show', { item: item });
    }
  });
});

module.exports = router;
