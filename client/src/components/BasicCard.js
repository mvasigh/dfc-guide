import React from 'react';

const BasicCard = ({ title, description }) => {
  return (
    <div className="box">
      <p className="title is-5">{title}</p>
      <div className="content">{description}</div>
    </div>
  );
};

export default BasicCard;
