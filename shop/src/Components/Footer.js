import React from 'react'
import {Link} from 'react-router-dom';
import insta_logo from '../img/instagram.png'
import phone_logo from '../img/phone.png'
import mail_logo from '../img/mail.png'
import location_logo from '../img/location.png'

export default function Footer() {
  return (
    <footer>
      <div>
        <div className='social_media'>
          <h6>Ми у соціальних мережах:</h6>
            <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
              <img className="logo_img" src={insta_logo} alt="Логотип" />
            </a>
        </div>
        <div className='navigation'>
          <h6>Quick Link</h6>
          <ul className="nav">
            <li><Link className='nav-li' to="/home">Головна Сторінка</Link></li>
            <li><Link className="nav-li" to="/about">Про Нас</Link></li>
            <li><Link className="nav-li" to="/contacts">Контакти</Link></li>
          </ul>
        </div>
        <div className='contact_us'>
          <h6>Contact Us</h6>
          <div>
            <img className="logo_img" src={phone_logo} alt="Логотип" />
            <span>+380673567890</span>
          </div>
          <div>
            <img className="logo_img" src={mail_logo} alt="Логотип" />
            <span>pharmacylviv@gmail.com</span>
          </div>
          <div>
            <img className="logo_img" src={location_logo} alt="Логотип" />
            <span>Lviv, Ukraine</span>
          </div>
      </div> 
      </div>
      <p>Усі права захищені &copy;</p>
    </footer>
  )
}
