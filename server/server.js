const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
app.use(cors());
dotenv.config();


app.use(express.json());
// Connect to MongoDB:  mongodb://localhost:27017/porfolio
mongoose.connect(process.env.MongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));
// Define routes
const projectsRoutes = require('./routes/projects');
const userRoutes = require('./routes/user');
app.use('/api/projects', projectsRoutes);
app.use('/api/user', userRoutes);

port=process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));







