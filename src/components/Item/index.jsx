import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ title, to }) => {
  return (
    <Link to={to} className="botao-quadrado">
      {title}
    </Link>
  );
};

export default Item;
