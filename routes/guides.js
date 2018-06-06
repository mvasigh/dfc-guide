const express = require('express'),
  router = express.Router({ mergeParams: true }),
  _ = require('lodash');

// Models
const Guide = require('../models/Guide'),
  Topic = require('../models/Topic');

// INDEX
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find({}).populate('guides');
    const guides = await Guide.find({});
    res.render('guide/index', { topics, guides });
  } catch (e) {
    console.log(e);
  }
});

// NEW
router.get('/new', (req, res) => {
  Topic.find({}).then(topics => res.render('guide/new', { topics }));
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const topic = await Topic.findById(req.body.topic);
    const guide = await Guide.create({
      ...req.body.guide,
      title: _.startCase(req.body.guide.title),
      topic
    });

    topic.guides.push({
      title: guide.title,
      description: guide.description,
      id: guide._id
    });
    topic.save();

    res.redirect(`guides/${guide._id}`);
  } catch (e) {
    console.log(e);
  }
});

// SHOW
router.get('/:guideId', async (req, res) => {
  const guide = await Guide.findById(req.params.guideId);
  const topics = await Topic.find({});

  console.log({ guide, topics });

  res.render('guide/show', { guide, topics });
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
