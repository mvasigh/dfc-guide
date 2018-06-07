const express = require('express'),
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  engine = require('ejs-mate'),
  bodyParser = require('body-parser'),
  expressSanitizer = require('express-sanitizer'),
  helmet = require('helmet'),
  methodOverride = require('method-override');

// ==============
// DB CONFIG
// ==============
const db = process.env.MONGO_URI || require('./config/keys').MONGO_URI;
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

app.use(express.static(__dirname + '/public'));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(methodOverride('_method'));
app.use(expressSanitizer());
app.use(helmet());

// ==============
// AUTH CONFIG
// ==============
const User = require('./models/User');
const secret =
  process.env.SECRET_OR_KEY || require('./config/keys').SECRET_OR_KEY;
app.use(
  require('express-session')({
    secret,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===============
// ROUTES
// ===============
const itemsRoutes = require('./routes/items'),
  categoriesRoutes = require('./routes/categories'),
  guidesRoutes = require('./routes/guides'),
  topicsRoutes = require('./routes/topics'),
  usersRoutes = require('./routes/users'),
  indexRoutes = require('./routes/index');

app.use('/items', itemsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/guides', guidesRoutes);
app.use('/topics', topicsRoutes);
app.use('/users', usersRoutes);
app.use('/', indexRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
