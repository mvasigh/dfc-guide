const express = require('express');
const router = express.Router({ mergeParams: true });
const Item = require('../models/item');

// INDEX - show all items
router.get('/', (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      console.log(err);
      res.redirect('back');
    } else {
      res.render('item/index', { items: items });
    }
  });
});

// NEW - show new item page
router.get('/new', (req, res) => {
  res.render('item/new');
});

// CREATE - create a new item in db
router.post('/', (req, res) => {
  console.log(req.body);
  Item.create(req.body.item, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(`/item/${item._id}`);
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
