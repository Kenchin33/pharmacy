const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({limit: '2mb'}));

const itemRoutes = require('./routes/items');
const categoryRoutes = require('./routes/categories');
const feedbackRoutes = require('./routes/feedback');
const orderRoutes = require('./routes/orders');

app.use('/api/items', itemRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/orders', orderRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));
  })
  .catch(err => console.error(err));
