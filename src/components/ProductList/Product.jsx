import React from "react";
import { colorCircleStyle } from "../constants.jsx";

const Product = ({ product }) => {
  return (
    <div className="product">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>
        <span style={colorCircleStyle(product.color)}></span>
        Цвет: {product.color}
      </p>
      <p>Категория: {product.category}</p>
      <p>Цена: {product.price} BYN</p>
      <p>Рейтинг: {product.rating}⭐️</p>
    </div>
  );
};

export default Product;
