const express = require('express');
// const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const pretty = require('express-prettify');
const auth = require('../middleware/auth');

// Custom modules
const indexRouter = require('../routes/index');
const registerRouter = require('../routes/register');
const authRouter = require('../routes/auth');
const tournamentsRouter = require('../routes/tournaments');
const connectDB = require('./db');

// Models
const User = require('../models/User');

// Express app init
const app = express();

// Logger
app.use(logger('dev'));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Prettify Json response
app.use(pretty({ query: 'pretty' }));

// Routes setup
app.use('/', indexRouter);
app.use('/api/register', registerRouter);
app.use('/api/auth', authRouter);
app.use('/api/tournaments', tournamentsRouter);

// Database Connection
connectDB();

// Set up passport and passport-local-mongoose
app.use(passport.initialize());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// // Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
//   );
// }

module.exports = app;
