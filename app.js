const express = require('express');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const seedDatabase = require('./seeds');

// ==============
// APP CONFIG
// ==============
const app = express();
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/dfc_guide');

seedDatabase();

// ===============
// ROUTES
// ===============
app.get('/', (req, res) => {
  res.render('home');
});

// RESOURCE ROUTES
app.get('/item/:id', (req, res) => {
  res.render('item/show');
});

app.listen(3000, () => {
  console.log('Server is running...');
});
