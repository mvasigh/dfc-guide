const express = require('express');
const router = express.Router({ mergeParams: true });

const Item = require('../models/item');

router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', async (req, res) => {
  const items = await Item.find({});
  res.render('home', { items });
});

router.get('/*', (req, res) => {
  res.render('404');
});

module.exports = router;
