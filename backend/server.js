require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const Recommendation = require('./models/Recommendation');
const app = express();

// Configure CORS options
const configuredClientUrl = process.env.CLIENT_URL;
const clientOrigin = configuredClientUrl
  ? new URL(configuredClientUrl.startsWith('http') ? configuredClientUrl : `https://${configuredClientUrl}`).origin
  : 'http://localhost:3000';
const corsOptions = {
  origin: clientOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  credentials: true, // Allow cookies to be sent with requests
  optionsSuccessStatus: 200
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(express.json({ extended: false }));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// JWT Middleware
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/body-type', authMiddleware, require('./routes/bodytype')); // Protect this route with JWT
// app.use('/api/outfit', require('./routes/outfit'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server error');
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
