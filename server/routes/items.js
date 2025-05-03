const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Отримати всі товари
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Додати новий товар
router.post('/', async (req, res) => {
  const item = new Item(req.body);
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Пошук товарів за запитом
router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ message: 'Пошуковий запит не може бути порожнім' });
  }

  try {
    // Використовуємо регулярний вираз для пошуку по полю title
    const items = await Item.find({
      title: { $regex: query, $options: 'i' }, // Пошук без врахування регістру
    }).limit(10); // Лімітуємо результати до 10 товарів

    res.json(items);
  } catch (err) {
    console.error("Помилка пошуку: ", err);
    res.status(500).json({ message: 'Помилка сервера' });
  }
});

module.exports = router;
