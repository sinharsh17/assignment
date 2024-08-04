const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const flash = require('connect-flash');

const app = express();
app.set('view engine', 'ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/quadiro')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: '2c255392d03c87a2f89711a8a5aea7807dd7c84b2bc0a81baca3a0b222c8c70da8f3399e5df5f8f0fcf1737fc4139c4009c14d4a51a0ef97ebd733f36f22e5e1', resave: false, saveUninitialized: false }));
app.use(flash());

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

