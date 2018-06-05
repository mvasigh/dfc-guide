const express = require('express'),
  mongoose = require('mongoose'),
  engine = require('ejs-mate'),
  bodyParser = require('body-parser'),
  expressSanitizer = require('express-sanitizer'),
  helmet = require('helmet'),
  methodOverride = require('method-override');

// ==============
// DB CONFIG
// ==============
const db = require('./config/keys').mongoURI || process.env.MONGO_URI;
mongoose
  .connect(db)
  .then(() => console.log('Connected to database'))
  .catch(e => console.log(e));

// ==============
// APP CONFIG
// ==============
const app = express();

app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(methodOverride('_method'));
app.use(expressSanitizer());
app.use(helmet());

// ===============
// ROUTES
// ===============
const itemsRoutes = require('./routes/items'),
  categoriesRoutes = require('./routes/categories'),
  guidesRoutes = require('./routes/guides'),
  topicsRoutes = require('./routes/topics'),
  indexRoutes = require('./routes/index');

app.use('/items', itemsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/guides', guidesRoutes);
app.use('/topics', topicsRoutes);
app.use('/', indexRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
