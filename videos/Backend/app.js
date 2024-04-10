const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const youtubeRoutes = require('./routes/youtubeRoutes');
const profileRoutes = require('./routes/profileRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const connectDB = require('./config/db')
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
connectDB();
app.use(session({
  secret: 'secret-key', // Use a secret key for signing the session ID cookie
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // For HTTPS, set secure: true
}));

app.use('/auth/google', authRoutes);
app.use('/api/youtube', youtubeRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/calendar', calendarRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
