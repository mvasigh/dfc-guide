const express = require('express'),
  router = express.Router({ mergeParams: true }),
  _ = require('lodash');

// Types
const Item = require('../models/item');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/home', async (req, res) => {
  const items = _.sortBy(await Item.find({}), item => item.views);
  res.render('home', { items });
});

router.get('/*', (req, res) => {
  res.render('404');
});

module.exports = router;
