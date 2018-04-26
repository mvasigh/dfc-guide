const express = require('express');
const router = express.Router({ mergeParams: true });
const Item = require('../models/item');
const Fuse = require('fuse.js');

// INDEX - show all items
router.get('/', (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      if (req.query.search) {
        const fuse = new Fuse(items, fuseOptions);
        res.render('item/index', {
          items: fuse.search(req.query.search),
          search: req.query.search
        });
      } else {
        res.render('item/index', { items: items, search: '' });
      }
    }
  });
});

// NEW - show new item page
router.get('/new', (req, res) => {
  res.render('item/new');
});

// CREATE - create a new item in db
router.post('/', (req, res) => {
  req.body.item.tags = req.body.item.tags.split(',').map(str => str.trim());
  Item.create(req.body.item, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(`/items/${item._id}`);
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

// EDIT - show item edit form
router.get('/:id/edit', (req, res) => {
  Item.findById(req.params.id, (err, item) => {
    if (err) {
      res.redirect('back');
    } else {
      res.render('item/edit', { item: item });
    }
  });
});

// UPDATE - update database with input
router.put('/:id', (req, res) => {
  req.body.item.tags = req.body.item.tags.split(',').map(str => str.trim());
  Item.findByIdAndUpdate(req.params.id, req.body.item, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect(`/items/${req.params.id}`);
    }
  });
});

// DESTROY - delete the item from database
router.delete('/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err);
    }
    res.redirect('/items');
  });
});

const fuseOptions = {
  keys: ['title', 'tags'],
  minMatchCharLength: 1,
  shouldSort: true
};

module.exports = router;
