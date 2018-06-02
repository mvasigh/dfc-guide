const express = require('express');
const router = express.Router({ mergeParams: true });
const _ = require('lodash');
const Fuse = require('fuse.js');
const FUSE_CONFIG = require('../config/fuse_config');
const Item = require('../models/item');
const Category = require('../models/category');

// INDEX - show all items
router.get('/', async (req, res) => {
  try {
    let items = await Item.find({});
    const categories = await Category.find({});
    const fuse = new Fuse(items, FUSE_CONFIG);

    if (req.query.search) {
      items = fuse.search(req.query.search);
    }
    items = _.chunk(items, 10);

    const options = {
      items,
      categories,
      search: req.query.search || ''
    };

    res.render('item/index', options);
  } catch (e) {
    console.log(e);
  }
});

// NEW - show new item page
router.get('/new', (req, res) => {
  res.render('item/new');
});

// CREATE - create a new item in db
router.post('/', (req, res) => {
  req.body.item.tags = req.body.item.tags.split(',').map(str => str.trim());
  Item.create(req.body.item)
    .then(item => {
      res.redirect(`/items/${item._id}`);
    })
    .catch(e => console.log(e));
});

// SHOW - show item by id
router.get('/:itemId', async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    const categories = await Category.find({});
    const relatedItems = await Item.find({
      category: {
        name: item.category.name
      }
    }).then(items => items.filter((item, index) => index < 4));

    res.render('item/show', { item, categories, relatedItems });
  } catch (e) {
    console.log(e);
  }
});

// EDIT - show item edit form
router.get('/:itemId/edit', async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    const categories = await Category.find({});

    res.render('item/edit', { item, categories });
  } catch (e) {
    console.log(e);
    res.redirect('back');
  }
});

// UPDATE - update database with input
router.put('/:itemId', async (req, res) => {
  // Refactor
  const category = await Category.findById(req.body.category);
  const tags = req.body.item.tags.split(', ').map(tag => tag.trim());
  const update = {
    ...req.body.item,
    tags,
    category: { name: category.name, id: category.id }
  };

  Item.findByIdAndUpdate(req.params.itemId, update).then(item => {
    category.items.addToSet(item._id);
    category.save();

    res.redirect(`/items/${req.params.itemId}`);
  });
});

// DESTROY - delete the item from database
router.delete('/:itemId', (req, res) => {
  Item.findByIdAndRemove(req.params.itemId, err => {
    if (err) {
      console.log(err);
    }
    res.redirect('/items');
  });
});

module.exports = router;
