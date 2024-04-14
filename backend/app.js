const express = require('express');
const session = require('express-session');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const youtubeRoutes = require('./routes/youtubeRoutes');
const profileRoutes = require('./routes/profileRoutes');
const calendarRoutes = require('./routes/calendarRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const connectDB = require('./config/db')
const app = express();
const port = 3000;
app.use(cors(
  {
    origin: 'http://localhost:8080', // Adjust according to your frontend host
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],  // Adjust based on your needs
    allowedHeaders: ['Content-Type', 'Authorization']
}
));
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
app.use('/api', sessionRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
