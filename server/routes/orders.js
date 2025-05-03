const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const transporter = require('../utils/mail');

router.post('/', async (req, res) => {
    const {firstName, lastName, email, phone, items, total} = req.body;

    const newOrder = new Order ({
        firstName,
        lastName,
        email,
        phone,
        items,
        total
    });

    try {
        await newOrder.save();

        const itemList = items.map(item => `<li>${item.title} (x${item.quantity}) - ${item.price} грн </li>`).join('');

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Підтвердження замовлення',
            html:  `
                <h2>Дякуємо за ваше замовлення, ${firstName}! </h2>
                <p>Ми отримали ваше замовлення та вже почали формувати його. </p>
                <h3>Деталі замовлення:</h3>
                <ul>${itemList}</ul>
                <p><strong>Загальна сума: </strong>${total} грн</p>
                <p>З повагою, Аптечна лавка</p>
            `
        };

        await transporter.sendMail(mailOptions);
        
        res.status(201).json({message: 'Замовлення успішно створено'});
    } catch (error) {
        res.status(500).json({ message: 'Сталася помилка при створенні замовлення'});
    }
});

module.exports = router;