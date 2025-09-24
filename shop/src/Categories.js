import React, { Component } from 'react';
import axios from 'axios';

export class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/categories')
      .then(res => {
        const allCategory = { key: 'all', name: 'Усі товари' };
        this.setState({ categories: [allCategory, ...res.data] });
      })
      .catch(err => {
        console.error('Помилка при завантаженні категорій:', err);
      });
  }

  render() {
    return (
      <div className='categories'>
        {this.state.categories.map(el => (
          <div key={el.key} onClick={() => this.props.chooseCategory(el.key)}>
            {el.name}
          </div>
        ))}
      </div>
    );
  }
}

export default Categories;
