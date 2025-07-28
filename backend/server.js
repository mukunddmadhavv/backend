const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/members', require('./routes/memberRoutes'));

app.get('/', (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
