require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const cookieParser = require("cookie-parser");
const dashboardRoutes = require('./routes/dashboard');


const app = express();
<<<<<<< HEAD
app.use(express.json());
=======
app.use(express.json()); // <--- MUST come BEFORE routes
>>>>>>> 8d4db3f12615b2d22009632f39e06b2d77e5c35a
app.use(cookieParser());
const allowedOrigins = [
  'http://localhost:3000',
  'https://stoc1-dfront.vercel.app'
];

app.use(cors({
<<<<<<< HEAD
  origin: function (origin, callback) {
    console.log('Request Origin:', origin); // Log the origin for debugging
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
=======
  origin: [
    'http://localhost:3000', // for local dev
    'https://stoc1-dfront-8d6l2e73e-satnams-projects-b6f4cbc8.vercel.app' // your deployed frontend
  ],
>>>>>>> 8d4db3f12615b2d22009632f39e06b2d77e5c35a
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.options('*', cors()); // Enable pre-flight requests for all routes



// Routes
app.use('/api/auth', authRoutes); // includes /login, /register, /me, /logout

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});



app.use('/api/dashboard', dashboardRoutes);


// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/admin-dashboard');
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    // Do NOT exit process, allowing the server to still run and return 500s with CORS
  }
};

// Start server (Connect to DB but don't wait for it to start listening)
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});
