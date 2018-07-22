import React from 'react';
import _ from 'lodash';
import ItemCard from './ItemCard';

const ItemsList = ({ items }) => {
  const renderItemsList = () =>
    _.map(items, item => (
      <ItemCard
        key={item._id}
        id={item._id}
        title={item.title}
        description={item.description}
        category={item.category.name}
        tags={item.tags}
      />
    ));
  return <div>{renderItemsList()}</div>;
};

export default ItemsList;
