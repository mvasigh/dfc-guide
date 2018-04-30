const express = require('express');
const router = express.Router({ mergeParams: true });
const Category = require('../models/category');

// INDEX
router.get('/', (req, res) => {
  Category.find({}, (err, categories) => {
    if (err) {
      console.log(err);
    } else {
      res.render('category/index', { categories });
    }
  });
});

// NEW
router.get('/new', (req, res) => {
  res.render('category/new');
});

// CREATE
router.post('/', (req, res) => {
  Category.create(req.body.category, (err, category) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/categories');
    }
  });
});

// EDIT
router.get('/:id/edit', (req, res) => {
  Category.findById(req.params.id, (err, category) => {
    if (err) {
      console.log(err);
    } else {
      res.render('category/edit', { category });
    }
  });
});

// UPDATE
router.put('/:id', (req, res) => {
  Category.findByIdAndUpdate(req.params.id, req.body.category, err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/categories');
    }
  });
});

// DELETE
router.delete('/:id', (req, res) => {
  Category.findByIdAndRemove(req.params.id, err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/categories');
    }
  });
});

router.get('/:categoryId', (req, res) => {
  Category.findById(req.params.categoryId)
    .populate('items')
    .exec((err, category) => {
      if (err) {
        console.log(err);
      } else {
        Category.find({}, (err, categories) => {
          if (err) {
            console.log(err);
          } else {
            res.render('category/show', { category, categories });
          }
        });
      }
    });
});

module.exports = router;
