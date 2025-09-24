import React from 'react';
import Items from '../Components/Items';
import Categories from '../Categories'

const Home = ({ items, addToOrder, chooseCategory, hideDesc }) => (
  <div>
    <Categories chooseCategory={chooseCategory} />
    <Items items={items} onAdd={addToOrder} hideDesc={hideDesc}/>
  </div>
);

export default Home;

