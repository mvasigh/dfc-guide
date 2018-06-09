const express = require('express'),
  router = express.Router({ mergeParams: true }),
  middleware = require('../middleware'),
  _ = require('lodash'),
  Fuse = require('fuse.js'),
  FUSE_CONFIG = require('../config/fuse_config');

// Types
const Item = require('../models/item'),
  Category = require('../models/category');

// INDEX
router.get('/', async (req, res) => {
  try {
    let items = await Item.find({});
    const categories = await Category.find({});
    const fuse = new Fuse(items, FUSE_CONFIG);

    if (req.query.search) {
      items = fuse.search(req.query.search);
    }
    items = _.chunk(items, 10);
    res.render('item/index', {
      items,
      categories,
      search: req.query.search || ''
    });
  } catch (e) {
    console.log(e);
  }
});

// NEW
router.get('/new', middleware.isLoggedIn, (req, res) => {
  Category.find({})
    .then(categories => res.render('item/new', { categories }))
    .catch(e => console.log(e));
});

// CREATE
router.post('/', middleware.isLoggedIn, async (req, res) => {
  const category = await Category.findById(req.body.category);
  req.body.item.tags = req.body.item.tags.split(',').map(str => str.trim());

  Item.create({ ...req.body.item, category })
    .then(item => {
      category.items.push(item);
      category.save();
      res.redirect(`/items/${item._id}`);
    })
    .catch(e => console.log(e));
});

// SHOW
router.get('/:itemId', async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    const categories = await Category.find({});
    const fuse = new Fuse(await Item.find({}), FUSE_CONFIG);

    res.render('item/show', {
      item,
      categories,
      relatedItems: fuse
        .search(item.category.name)
        .filter(relatedItem => relatedItem.title != item.title)
        .filter((entry, i) => i < 4)
    });
  } catch (e) {
    console.log(e);
  }
});

// EDIT
router.get('/:itemId/edit', middleware.isLoggedIn, async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemId);
    const categories = await Category.find({});

    res.render('item/edit', { item, categories });
  } catch (e) {
    console.log(e);
    res.redirect('back');
  }
});

// UPDATE
router.put('/:itemId', middleware.isLoggedIn, async (req, res) => {
  // Refactor
  const category = await Category.findById(req.body.category);
  const tags = req.body.item.tags.split(', ').map(tag => tag.trim());
  const update = {
    ...req.body.item,
    tags,
    category: { name: category.name, id: category.id }
  };

  // Delete item from old category
  Category.updateOne(
    { items: { _id: req.params.itemId } },
    {
      $pull: {
        items: req.params.itemId
      }
    },
    err => {
      if (err) console.log(err);
      else {
        Item.findByIdAndUpdate(req.params.itemId, update).then(item => {
          category.items.addToSet(item._id);
          category.save();

          res.redirect(`/items/${req.params.itemId}`);
        });
      }
    }
  );
});

// DESTROY
router.delete('/:itemId', middleware.isLoggedIn, (req, res) => {
  Category.updateOne(
    { items: { _id: req.params.itemId } },
    {
      $pull: {
        items: req.params.itemId
      }
    },
    (err, category) => {
      if (err) console.log(err);
      else {
        Item.findByIdAndRemove(req.params.itemId, err => {
          if (err) console.log(err);
          res.redirect('/items');
        });
      }
    }
  );
});

module.exports = router;
