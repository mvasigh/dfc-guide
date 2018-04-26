const express = require('express');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const seedDB = require('./seeds');
const methodOverride = require('method-override');
const Item = require('./models/item');
const itemsRoutes = require('./routes/items');

// ==============
// APP CONFIG
// ==============
mongoose.connect('mongodb://localhost/dfc_guide');
const app = express();
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(methodOverride('_method'));

seedDB();

// ===============
// ROUTES
// ===============
app.use('/items', itemsRoutes);

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  Item.find({}, (err, items) => {
    if (err) {
      res.render('home', {
        items: []
      });
    } else {
      res.render('home', {
        items: items
      });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running...');
});
