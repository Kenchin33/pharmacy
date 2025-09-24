import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ItemDetails = ({items, addToOrder}) => {
    const {id} = useParams()
    console.log('ID з URL:', id);
    console.log('items:', items);
    const item = items.find(item => item._id === id)
    const [isCharVisible, setIsCharVisible] = useState(false)

    if(!item) {
        return <h2>Item not found</h2>
    }

    const handleAddToCart = () => {
        addToOrder(item);
    };

    const tooggleCharVisibility = () => {
        setIsCharVisible(!isCharVisible)
    }

    return (
        <div className="item-details-container">
            <div className="item-details">
                <div className="item-image">
                    <img src={item.img} alt={item.title}></img>
                </div>
                <div className="item-info">
                    <h2>{item.title}</h2>
                    <b className="item-price">{item.price} грн</b>
                    <p className="item-desc">{item.desc}</p>
                    <button className="add-to-cart-btn" onClick={handleAddToCart}>Додати до кошика</button>
                    <p className="toogle-char-btn" onClick={tooggleCharVisibility}>{isCharVisible ? "Закрити Характеристики" : "Відкрити характеристики"}</p>
                    <div className={`item-char ${isCharVisible ? "open" : ""}`}>
                        <ul className="char-list">
                            <li className="char-list-item">{item.char1}</li>
                            <li className="char-list-item">{item.char2}</li>
                            <li className="char-list-item">{item.char3}</li>
                            <li className="char-list-item">{item.char4}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetails;
