const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const homeRoutes = require('./src/routes/homeRoutes');
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/', homeRoutes)
app.use('/api/users', userRoutes);
module.exports = router;
//