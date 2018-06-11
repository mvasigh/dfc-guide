const express = require('express'),
  router = express.Router({ mergeParams: true }),
  middleware = require('../middleware'),
  _ = require('lodash');

// Types
const Category = require('../models/category');

// INDEX
router.get('/', middleware.isLoggedIn, (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) {
      console.log(err);
    } else {
      res.render('category/index', { categories });
    }
  });
});

// NEW
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('category/new');
});

// CREATE
router.post('/', middleware.isLoggedIn, (req, res) => {
  Category.create(req.body.category, (err, category) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/categories');
    }
  });
});

// EDIT
router.get('/:categoryId/edit', middleware.isLoggedIn, (req, res) => {
  Category.findById(req.params.categoryId, (err, category) => {
    if (err) {
      console.log(err);
    } else {
      res.render('category/edit', { category });
    }
  });
});

// UPDATE
router.put('/:categoryId', middleware.isLoggedIn, (req, res) => {
  Category.findByIdAndUpdate(req.params.categoryId, req.body.category, err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/categories');
    }
  });
});

// DELETE
router.delete('/:categoryId', middleware.isLoggedIn, (req, res) => {
  Category.findByIdAndRemove(req.params.categoryId, err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/categories');
    }
  });
});

router.get('/:categoryId', async (req, res) => {
  try {
    const categories = _.sortBy(
      await Category.find({}),
      category => category.name
    );
    const category = await Category.findById(req.params.categoryId).populate(
      'items'
    );
    items = _.chunk(category.items, 10);
    res.render('category/show', { items, categories });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
