import React, { Component } from 'react';
import About_Us from '../img/about_img/about_us.jpg'
import Job_Time from '../img/about_img/job_time.png'
import Payment from '../img/about_img/payment.png'
import Shipping from '../img/about_img/shipping.png'

export default class About extends Component {
    render() {
        return (
            <div className='about_us'>
                <img src={About_Us} className='about-us-page-img-1'/>
                <h2>Про Нас</h2>
                <p>Ми молода аптека у самому центрі Львова.</p>
                <p>У нас на сайті Ви зможете знайти усі необхідні для Вас ліки по найкращим цінам.</p>
                <img src={Job_Time} className='about-us-page-img'/>
                <h2>Графік роботи</h2>
                <p><strong>Пн-Пт:</strong> 08:00 - 23:00</p>
                <p><strong>Сб:</strong> 09:00 - 23:00</p>
                <p><strong>Нд:</strong> 09:00 - 21:00</p>
                <img src={Shipping} className='about-us-page-img'/>
                <h2>Доставка та самовивіз</h2>
                <p>Доставка виконується кур'єром лише по Львову</p>
                <p><strong>Час доставки:</strong> 1-3 години з моменту замовлення</p>
                <br></br>
                <p>Самовивіз можливий із точки видачі при замовленні онлайн <strong>через 30 хв після створення замовлення</strong></p>
                <img src={Payment} className='about-us-page-img'/>
                <h2>Оплата</h2>
                <p><strong>Оплата можлива наступними варіантами:</strong></p>
                <ul>
                <li>Оплата на сайті</li>
                <li>Оплата при отриманні у аптеці</li>
                </ul>  
            </div>
        );
    }
}
