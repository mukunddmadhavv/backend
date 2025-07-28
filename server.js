require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const memberRoutes = require('./routes/memberRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const allowedOrigins = ['https://your-frontend-site.netlify.app']; // Replace with your actual Netlify URL

app.use(cors({
  origin: 'https://track-now.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));



app.use(express.json());

// 👉 Routes
app.use('/api/members', memberRoutes);

// 👉 MongoDB Connection
console.log("🌐 Connecting to MongoDB...");

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    // Start server only after DB connects

app.get('/', (req, res) => {
  res.send('API is working');
});

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });
