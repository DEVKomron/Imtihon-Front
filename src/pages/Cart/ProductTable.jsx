// components/ProductTable.jsx
import React from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import "./ProductTable.scss";

function ProductTable({ product, onQuantityChange, onRemove }) {
  return (
    <div className="product-table">
      <img src={product.image} alt={product.title} className="product-img" />
      <div className="product-info">
        <h3>{product.title}</h3>
        <p>Size: {product.size}</p>
        <p>Color: {product.color}</p>
        <div className="quantity-controls">
          <FaMinus onClick={() => onQuantityChange(Math.max(1, product.quantity - 1))} />
          <span>{product.quantity}</span>
          <FaPlus onClick={() => onQuantityChange(product.quantity + 1)} />
        </div>
      </div>
      <div className="product-price">${(product.price * product.quantity).toFixed(2)}</div>
      <FaTrash className="remove-icon" onClick={onRemove} />
    </div>
  );
}

export default ProductTable;
