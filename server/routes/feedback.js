const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
    try{
        const {email, message} = req.body;
        const feedback = new Feedback({ email, message });
        await feedback.save();
        res.status(201).json({ message: 'Повідомлення надіслано!'});
    } catch (err) {
        res.status(500).json({ error: 'Помилка збереження повідомлення'});
    }
});

module.exports = router;