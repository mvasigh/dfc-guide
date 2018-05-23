const express = require('express');
const router = express.Router({ mergeParams: true });

const Guide = require('../models/Guide');
const Topic = require('../models/Topic');

// INDEX
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find({});
    const guides = await Guide.find({});

    res.render('guide/index', { topics, guides });
  } catch (e) {
    console.log(e);
  }
});

// NEW
router.get('/new', (req, res) => {
  res.render('guide/new');
});

// CREATE
router.post('/', (req, res) => {
  Guide.create(req.body.guide)
    .then(guide => {
      console.log(guide);
      res.redirect('/');
    })
    .catch(err => console.log(err));
});

// SHOW
router.get('/:guideId', (req, res) => {
  Guide.findById(req.params.guideId, (err, guide) => {
    res.render('guide/show', { guide });
  });
});

// EDIT
router.get('/:guideId/edit', (req, res) => {
  Guide.findById(req.params.guideId, (err, guide) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.render('guide/edit', { guide });
    }
  });
});

// UPDATE
router.put('/:guideId', (req, res) => {
  Guide.findByIdAndUpdate(req.params.guideId, req.body.guide, (err, guide) => {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      res.redirect(`/guides/${req.params.guideId}`);
    }
  });
});

// DESTROY
router.delete('/:guideId', (req, res) => {
  Guide.findByIdAndRemove(req.params.guideId, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Guide deleted');
      res.redirect('/');
    }
  });
});

module.exports = router;
