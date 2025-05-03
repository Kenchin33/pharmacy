const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: String,
  img1: String,
  desc: String,
  category: String,
  price: String,
  char1: String,
  char2: String,
  char3: String,
  char4: String
});

module.exports = mongoose.models.Item || mongoose.model('Item', itemSchema);
