const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require("cookie-parser");
require('dotenv').config(); // For loading environment variables

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
   .then(() => console.log('MongoDB connected'))
   .catch((err) => console.error('MongoDB connection error:', err));

// Body parser middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session middleware with MongoDB store
app.use(session({
   secret: process.env.SESSION_SECRET || 'asham07',
   resave: false, // Don't save session if unmodified
   saveUninitialized: false, // Don't create session until something is stored
   store: MongoStore.create({ 
      mongoUrl: process.env.MONGO_URL,
      collectionName: 'sessions'
   }),
   cookie: {
      secure: false, // Set to true in production with HTTPS
      sameSite: 'None',
   }
}));

// Passport.js initialization
app.use(passport.initialize());
app.use(passport.session());

require('./config/passportConfig'); // Passport strategy configuration

// Use CORS for cross-origin requests from the frontend
const cors = require('cors');
app.use(cors({
   origin: 'http://localhost:5173', // Replace with your frontend URL
   credentials: true // Enable credentials (cookies) to be passed
}));

// Routes
app.use('/auth', authRoutes);

// Root route
app.get('/', (req, res) => {
   res.send('Server is running!');
});

// Error handling middleware
app.use((err, req, res, next) => {
   console.error(err.stack);
   res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
