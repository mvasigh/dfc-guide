import React, { Component } from 'react';
import ItemCard from './ItemCard';

export class ItemsList extends Component {
  renderList(items) {}

  render() {
    let cardWidth;
    switch (this.props.col) {
      case 2:
        cardWidth = 'half';
        break;
      case 3:
        cardWidth = 'one-third';
        break;
      case 4:
        cardWidth = 'one-fourth';
        break;
    }

    return (
      <div className="columns">
        <ItemCard
          id={1}
          title="Hello World"
          description="Wow this is truly a wonderful React component"
          category="test"
          tags={['hello', 'world']}
        />
      </div>
    );
  }
}

export default ItemsList;
