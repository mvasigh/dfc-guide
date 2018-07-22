const express = require('express'),
  router = express.Router({ mergeParams: true }),
  middleware = require('../../middleware'),
  _ = require('lodash');

const Topic = require('../../models/Topic');

router.get('/', async (req, res) => {
  const topics = _.sortBy(
    await Topic.find({}).populate('guides'),
    topic => topic.index
  );
  res.json({ topics });
});

router.get('/:topicId', async (req, res) => {
  const topic = await Topic.findById(req.params.topicId).populate('guides');
  res.json({ topic });
});

// // NEW
// router.get('/new', middleware.isLoggedIn, (req, res) => {
//   res.render('topic/new');
// });

// // CREATE
// router.post('/', middleware.isLoggedIn, (req, res) => {
//   const title = _.startCase(req.sanitize(req.body.topic.title));

//   Topic.create({ title: title })
//     .then(topic => {
//       res.redirect('/guides');
//     })
//     .catch(err => console.log(err));
// });

module.exports = router;
