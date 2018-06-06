const express = require('express'),
  router = express.Router({ mergeParams: true }),
  passport = require('passport');

const User = require('../models/User');

// Registration form
router.get('/register', (req, res) => {
  res.render('user/register');
});

// Register user
router.post('/register', (req, res) => {
  const newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    passport.authenticate('local')(req, res, () => res.redirect('/items'));
  });
});

// Login form
router.get('/login', (req, res) => {
  res.render('user/login');
});

// Log user in
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/items',
    failureRedirect: '/users/login'
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/items');
});

module.exports = router;
