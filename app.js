const express = require('express');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const seedDB = require('./seeds');
const methodOverride = require('method-override');
const Item = require('./models/item');
const itemsRoutes = require('./routes/items');
const indexRoutes = require('./routes/index');

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

// seedDB();

// ===============
// ROUTES
// ===============
app.use('/items', itemsRoutes);
app.use('/', indexRoutes);

app.listen(3000, () => {
  console.log('Server is running...');
});
