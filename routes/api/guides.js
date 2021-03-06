const express = require('express'),
  router = express.Router({ mergeParams: true }),
  middleware = require('../../middleware'),
  _ = require('lodash');

// Types
const Guide = require('../../models/Guide');

// INDEX
router.get('/', async (req, res) => {
  // const topics = _.sortBy(
  //   await Topic.find({}).populate('guides'),
  //   topic => topic.index
  // );
  // res.json({ topics });

  const guides = await Guide.find({});
  res.json({ guides });
});

// SHOW
router.get('/:guideId', async (req, res) => {
  const guide = await Guide.findById(req.params.guideId);
  res.json({ guide });
});

// // NEW
// router.get('/new', middleware.isLoggedIn, (req, res) => {
//   Topic.find({}).then(topics => res.render('guide/new', { topics }));
// });

// // CREATE
// router.post('/', middleware.isLoggedIn, async (req, res) => {
//   try {
//     const topic = await Topic.findById(req.body.topic);
//     const guide = await Guide.create({
//       ...req.body.guide,
//       title: _.startCase(req.body.guide.title),
//       topic
//     });

//     topic.guides.push({
//       title: guide.title,
//       description: guide.description,
//       id: guide._id
//     });
//     topic.save();

//     res.redirect(`guides/${guide._id}`);
//   } catch (e) {
//     console.log(e);
//   }
// });

// // EDIT
// router.get('/:guideId/edit', middleware.isLoggedIn, (req, res) => {
//   Guide.findById(req.params.guideId, (err, guide) => {
//     if (err) {
//       console.log(err);
//       res.redirect('/');
//     } else {
//       res.render('guide/edit', { guide });
//     }
//   });
// });

// // UPDATE
// router.put('/:guideId', middleware.isLoggedIn, (req, res) => {
//   Guide.findByIdAndUpdate(req.params.guideId, req.body.guide, (err, guide) => {
//     if (err) {
//       console.log(err);
//       res.redirect('/');
//     } else {
//       res.redirect(`/guides/${req.params.guideId}`);
//     }
//   });
// });

// // DESTROY
// router.delete('/:guideId', middleware.isLoggedIn, (req, res) => {
//   Guide.findByIdAndRemove(req.params.guideId, err => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.redirect('/');
//     }
//   });
// });

module.exports = router;
