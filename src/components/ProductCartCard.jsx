import React, { useContext, useEffect, useState } from "react";
import style from "./ProductCartCard.module.css";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";

const ProductCartCard = ({ item, product }) => {
  const { handleRemoveFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Handle navigation to the product details page
  const handleViewDetails = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className={style.cartCardContainer}>
      {/* Image container of product */}
      <div className={style.imageContainer}>
        <img
          src={product.urls[0]}
          alt={product.name}
          className={style.productImage}
        />
      </div>
      {/* Showing various details of product */}
      <div className={style.detailsContainer}>
        <p className={style.productName}>{product.name}</p>
        <p className={style.productPrice}>₹{product.price}</p>
        <p className={style.productQuantity}>Quantity: {item.quantity}</p>
        <div className={style.buttonContainer}>
          <button className={style.viewDetailsBtn} onClick={handleViewDetails}>
            View Details
          </button>
          <button
            className={style.removeBtn}
            onClick={() => handleRemoveFromCart(product.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCartCard;
