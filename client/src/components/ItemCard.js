import React from 'react';
import { Link } from 'react-router-dom';

const ItemCard = ({ id, title, category, tags, description }) => {
  const renderTags = tags =>
    tags.map((tag, i) => (
      <Link className="tag is-light is-rounded" to={`/items?search=${tag}`}>
        {tag}
      </Link>
    ));

  return (
    <div className="box">
      <article className="media">
        <div className="media-content">
          <p className="subtitle is-6 dfc-category-label">{category}</p>
          <p className="title is-5">
            <Link to={`/items/${id}`} className="has-text-link">
              {title}
            </Link>
          </p>
          <div className="tags">{renderTags(tags)}</div>
          <div className="content dfc-card-description">{description}</div>
        </div>
      </article>
    </div>
  );
};

export default ItemCard;
