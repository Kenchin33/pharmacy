import React, { Component } from 'react';
import Item from './Item';

export class Items extends Component {
  render() {
    return (
      <main>
        {this.props.items.map(el => (
          <Item key={el.id} item={el} onAdd={this.props.onAdd} hideDesc={this.props.hideDesc} />
        ))}
      </main>
    );
  }
}

export default Items;
