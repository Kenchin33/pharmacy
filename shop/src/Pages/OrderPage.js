import React, { useState } from 'react';

export default function OrderPage({ orders, clearCart, setToastMessage, navigate }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    let sum = 0;
    orders.forEach(el => (sum += Number.parseFloat(el.price) * el.quantity));

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const orderData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            items: orders,
            total: sum.toFixed(2)
        };

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Помилка при створенні замовлення!');
            }

            setToastMessage('Замовлення успішно оформлено!');
            clearCart();
            navigate('/home');
        } catch (error) {
            console.error(error.message);
            setToastMessage('Не вдалося створити замовлення');
        }
    };

    return (
      <div className='checkout-page'>
        <div className='checkout-form'>
            <h2>Оформлення замовлення</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Ім'я:
                    <input type='text' name='firstName' value={formData.firstName} onChange={handleInputChange} required />
                </label>
                <label>
                    Прізвище:
                    <input type='text' name='lastName' value={formData.lastName} onChange={handleInputChange} required />
                </label>
                <label>
                    Email:
                    <input type='email' name='email' value={formData.email} onChange={handleInputChange} required />
                </label>
                <label>
                    Номер телефону:
                    <input type='tel' name='phone' value={formData.phone} onChange={handleInputChange} required />
                </label>
                <button type='submit'>Підтвердити замовлення</button>
            </form>
        </div>
        <div className='checkout-cart'>
            <h2>Ваше замовлення</h2>
            {orders.map(el => (
                <div key={el.id} className='order-summary-item'>
                    <img src={el.img} alt={el.title} />
                    <div>
                        <h3>{el.title}</h3>
                        <p>Кількість: {el.quantity}</p>
                        <p>Ціна за шт.: {el.price} грн</p>
                    </div>
                </div>
            ))}
            <p className='checkout-total'>Загальна вартість: {sum.toFixed(2)} грн</p>
        </div>
      </div>
    );
}
