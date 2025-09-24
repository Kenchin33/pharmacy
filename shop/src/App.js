import React, { useState } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contacts from "./Pages/Contacts";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ItemDetails from "./Pages/ItemDetails";
import OrderPage from "./Pages/OrderPage";
import { useNavigate, useLocation } from "react-router-dom";
import SearchResults from "./Pages/SearchResults";
import Toast from "./Components/Toast";
import axios from "axios";
import Items from "./Components/Items";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState([]);
  const [currentItems, setCurrentItems] = React.useState([]);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

    // Функція для отримання даних з API
    React.useEffect(() => {
      axios.get('http://localhost:5000/api/items')
        .then(res => {
          setItems(res.data); // Оновлюємо стан з отриманими айтемами
        })
        .catch(err => {
          console.error('Помилка при завантаженні айтемів:', err);
        });
    }, []);

  React.useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  const addToOrder = (item) => {
    setCartItems([...cartItems, item]);
    setToastMessage(`"${item.title}" додано у кошик!`);
    const updatedOrders = [...orders];
    const existingItem = updatedOrders.find((el) => el._id === item._id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedOrders.push({ ...item, quantity: 1 });
    }
    setOrders(updatedOrders);
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter((el) => el._id !== id));
  };

  const chooseCategory = (category) => {
    if (category === "all") {
      setCurrentItems(items);
    } else {
      setCurrentItems(items.filter((el) => el.category === category));
    }
  };

  const clearCart = () => {
    setOrders([]);
  }

  return (
    <div className="wrapper">
      <Header cartItems={cartItems} orders={orders} onDelete={deleteOrder} pathname={location.pathname} />
      {toastMessage && (<Toast message={toastMessage} onClose={() => setToastMessage('')} />)}
      <Routes>
        <Route path="/" element={<Items items={items} onAdd={addToOrder} />} />
        <Route path="/" element={<Navigate to="/home" /> } />
        <Route
          path="/home"
          element={<Home items={currentItems} addToOrder={addToOrder} chooseCategory={chooseCategory} orders={orders} hideDesc={true} />}
        />
        <Route path="/items/:id" element={<ItemDetails items={items} addToOrder={addToOrder} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/checkout" element={<OrderPage orders={orders} clearCart={clearCart} setToastMessage={setToastMessage} navigate={navigate} />} />
        <Route path="/search" element={<SearchResults onAddToCart={addToOrder} />} />
      </Routes>
      {location.pathname !== "/checkout" && <Footer />}
    </div>
  );
}

export default App;
