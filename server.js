require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const cookieParser = require("cookie-parser");
const dashboardRoutes = require('./routes/dashboard');


const app = express();
app.use(cookieParser());
app.use(express.json()); // <--- MUST come BEFORE routes
const allowedOrigins = [
  'http://localhost:3000',
  'https://stoc1-dfront.vercel.app'
];

app.use(cors({
  origin: [
    'http://localhost:3000', // for local dev
    'https://stoc1-dfront-8d6l2e73e-satnams-projects-b6f4cbc8.vercel.app' // your deployed frontend
  ],
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));



// Routes
app.use('/api/auth', authRoutes); // includes /login, /register, /me, /logout

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});



app.use('/api/dashboard', dashboardRoutes);


// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/admin-dashboard')
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    
    // Start server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});
