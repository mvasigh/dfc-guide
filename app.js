const express = require('express'),
  path = require('path'),
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

app.use(express.static(path.join(__dirname, 'client/build')));
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

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// ===============
// ROUTES
// ===============
const itemsRoutes = require('./routes/api/items'),
  categoriesRoutes = require('./routes/api/categories'),
  guidesRoutes = require('./routes/api/guides'),
  topicsRoutes = require('./routes/api/topics');

app.use('/api/items', itemsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/guides', guidesRoutes);
app.use('/api/topics', topicsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
