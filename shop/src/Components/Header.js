import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import Order from './Order';
import logo from '../img/logo.png';

const showOrder = (props) => {
  let sum = 0;
  props.orders.forEach(el => sum += Number.parseFloat(el.price) * el.quantity);
  return (
    <div>
      {props.orders.map(el => (
        <Order onDelete={props.onDelete} key={el._id} item={el} />
      ))}
      <p className="sum">Загальна вартість: {sum.toFixed(2)} грн</p>
      <div className="complete-order-btn-centralization">
        <Link to="/checkout">
          <button className="complete-order-btn">Оформити замовлення</button>
        </Link>
      </div>
    </div>
  );
};

const showNothing = () => (
  <div className="empty">
    <h2>Корзина порожня</h2>
  </div>
);

export default function Header(props) {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const cartRef = useRef(null); 

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/items/search?q=${query}`);
        const data = await response.json();
        setResults(data.slice(0, 3));
      } catch (err) {
        console.error("Помилка пошуку: ", err);
      }
    };

    const timeout = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (location.pathname.includes('/product/')) {
      setSearchOpen(false);
      setQuery('');
      setResults([]);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }

      // Додаємо перевірку для кліку поза корзиною
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartOpen(false);
      }
    };

    if (searchOpen || cartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen, cartOpen]);

  return (
    <header>
      <div>
        <Link to="/home">
          <img className="logo_img" src={logo} alt="Логотип" />
        </Link>
        {location.pathname !== '/checkout' && (
          <>
            <ul className="nav">
              <li><Link className="nav-li" to="/about">Про Нас</Link></li>
              <li><Link className="nav-li" to="/contacts">Контакти</Link></li>
            </ul>
            <div className="cart-icon-wrapper" onClick={() => setCartOpen(!cartOpen)}>
              <FaShoppingCart
                className={`shop-cart-button ${cartOpen && 'active'}`}
              />
              {props.orders.length > 0 && (
                <span className="cart-count">{props.orders.reduce((acc, item) => acc + item.quantity, 0)}</span>
              )}
            </div>
            <div className="search-container" ref={searchRef}>
              <button className="search-toggle" onClick={() => setSearchOpen(!searchOpen)}>
                <FaSearch />
              </button>
              {searchOpen && (
                <div className="search-dropdown">
                  <input
                    type="text"
                    placeholder="Пошук товарів..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="search-input"
                  />
                  {results.length > 0 && (
                    <ul className="search-result">
                      {results.map((item) => (
                        <li
                          key={item._id}
                          className="search-result-item"
                          onClick={() => {
                            setSearchOpen(false);
                            setQuery('');
                            setResults([]);
                            navigate(`/items/${item._id}`);
                          }}
                        >
                          <div className="search-result-item-content">
                            <img
                              src={item.img}
                              alt={item.title}
                              className="search-result-item-img"
                            />
                            <div>
                              <h4>{item.title}</h4>
                              <p>{item.price} грн</p>
                            </div>
                          </div>
                        </li>
                      ))}
                      <li
                        className="search-view-all"
                        onClick={() => {
                          const searchQuery = query;
                          setSearchOpen(false);
                          setQuery('');
                          setResults([]);
                          navigate(`/search?q=${searchQuery}`);
                        }}
                      >
                        Переглянути всі результати
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>

            {cartOpen && (
              <div className="shop-cart" ref={cartRef}>
                {props.orders.length > 0 ? showOrder(props) : showNothing()}
              </div>
            )}
          </>
        )}
      </div>

      {location.pathname === '/home' && (
        <>
          <div className="presentation"></div>
          <div className="catalog-title">Каталог Товарів</div>
        </>
      )}
    </header>
  );
}
