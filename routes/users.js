const express = require('express'),
  router = express.Router({ mergeParams: true }),
  middleware = require('../middleware'),
  passport = require('passport');

const User = require('../models/User');

// Below two routes intentionally require user to be logged in to prevent external registrations until user permissions are implemented
// Registration form
router.get('/register', middleware.isLoggedIn, (req, res) => {
  res.render('user/register');
});

// Register user
router.post('/register', middleware.isLoggedIn, (req, res) => {
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
