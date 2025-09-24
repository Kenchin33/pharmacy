import React from 'react'
import { Link } from 'react-router-dom'

export const Item = ({item, onAdd, hideDesc}) => {
  return (
    <div className='item'>
      <Link to={`/items/${item._id}`}>
        <img src={item.img} alt={item.title}/>
      </Link>
      <h2>
        <Link to={`/items/${item._id}`}>{item.title}</Link>
      </h2>
      {!hideDesc && <p>{item.desc}</p>}
      <b>{item.price} грн</b>
      <div className='add-to-cart' onClick={() => onAdd(item)}>+</div>
    </div>
    )
  }

export default Item
