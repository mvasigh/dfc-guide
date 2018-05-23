const express = require('express');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const expressSanitizer = require('express-sanitizer');
const helmet = require('helmet');
const seedDB = require('./seeds');
const methodOverride = require('method-override');
const itemsRoutes = require('./routes/items');
const categoriesRoutes = require('./routes/categories');
const guidesRoutes = require('./routes/guides');
const topicsRoutes = require('./routes/topics');
const indexRoutes = require('./routes/index');

mongoose.connect('mongodb://localhost/dfc_guide');

// ==============
// APP CONFIG
// ==============
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
app.use(expressSanitizer());
app.use(helmet());

// seedDB();

// ===============
// ROUTES
// ===============
app.use('/items', itemsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/guides', guidesRoutes);
app.use('/topics', topicsRoutes);
app.use('/', indexRoutes);

app.listen(3000, () => {
  console.log('Server is running...');
});
