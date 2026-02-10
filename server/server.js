const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const courseRoutes = require('./routes/courseRoutes');
const eventRoutes = require('./routes/eventRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const jobRoutes = require('./routes/jobRoutes');
const messageRoutes = require('./routes/messageRoutes');
const donationRoutes = require('./routes/donationRoutes');
const studentRoutes = require('./routes/studentRoutes');
const seedData = require('./utils/seeder');

dotenv.config();

connectDB().then(() => {
  seedData(); // Run seeder after DB connection
});

const app = express();

const server = http.createServer(app);

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "https://nexkind.vercel.app",
  "https://nexkind.vercel.app/"
].filter(Boolean);

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"]
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/student', studentRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
