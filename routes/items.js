const express = require('express');
const router = express.Router({ mergeParams: true });
const Item = require('../models/item');
const Category = require('../models/category');
const Fuse = require('fuse.js');

// INDEX - show all items
router.get('/', (req, res) => {
  // TODO: Refactor this mess
  Item.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      Category.find({}, (err, categories) => {
        if (err) {
          console.log(err);
        } else if (req.query.search) {
          const fuse = new Fuse(items, fuseOptions);
          res.render('item/index', {
            items: fuse.search(req.query.search),
            categories: categories,
            search: req.query.search
          });
        } else {
          res.render('item/index', {
            items: items,
            categories: categories,
            search: ''
          });
        }
      });
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
      Category.find({}, (err, categories) => {
        if (err) {
          console.log(err);
        } else {
          res.render('item/edit', { item, categories });
        }
      });
    }
  });
});

// UPDATE - update database with input
router.put('/:id', (req, res) => {
  Category.findById(req.body.selection, (err, category) => {
    if (err) {
      console.log(err);
    } else {
      req.body.item.tags = req.body.item.tags.split(',').map(str => str.trim());
      req.body.item.category = {
        name: category.name,
        id: category.id
      };

      Item.findByIdAndUpdate(req.params.id, req.body.item, (err, item) => {
        if (err) {
          console.log(err);
        } else {
          console.log(item);
          category.items.addToSet(item._id);
          category.save();

          res.redirect(`/items/${req.params.id}`);
        }
      });
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
  keys: ['title', 'tags', 'category.name'],
  minMatchCharLength: 1,
  shouldSort: true
};

module.exports = router;
