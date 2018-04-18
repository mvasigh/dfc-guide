const express = require('express');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const seedDatabase = require('./seeds');
const methodOverride = require('method-override');

const itemRoutes = require('./routes/items');

// ==============
// APP CONFIG
// ==============
mongoose.connect('mongodb://localhost/dfc_guide');
const app = express();
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ===============
// ROUTES
// ===============
app.use('/item', itemRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(3000, () => {
  console.log('Server is running...');
});
