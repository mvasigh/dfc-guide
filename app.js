const express = require('express');
const mongoose = require('mongoose');
const engine = require('ejs-mate');

// ==============
// APP CONFIG
// ==============
const app = express();
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/dfc_guide');

// ==============
// SCHEMAS
// ==============
const Item = require('./models/item');

// ===============
// ROUTES
// ===============
app.get('/', (req, res) => {
    res.render('home');
})

// RESOURCE ROUTES
app.get('/item/:id', (req, res) => {
    res.render('item/show');
})

app.listen(3000, () => {
    console.log('Server is running...');
})