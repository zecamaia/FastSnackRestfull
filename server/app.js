const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const homeRoutes = require('./src/routes/homeRoutes');
const tokenRoutes = require('./src/routes/tokenRoutes');
const eventoRoutes = require('./src/routes/eventoRoutes');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/', homeRoutes)
app.use('/api/users', userRoutes);
app.use('/api/token/', tokenRoutes);
app.use('/api/eventos/', eventoRoutes);
module.exports = app;
