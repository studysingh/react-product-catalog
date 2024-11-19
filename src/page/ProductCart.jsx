import React, { useContext, useEffect } from "react";
import ProductCartCard from "../components/ProductCartCard";
import style from "./ProductCart.module.css";
import CartContext from "../context/CartContext";
import { useNavigate } from "react-router";

const ProductCartPage = ({ allProduct }) => {
  const navigate = useNavigate();

  const { cartItems } = useContext(CartContext);

  // Handle navigation to the home page
  const handleNavigateHome = () => {
    navigate("/");
  };

  // When there is not any item in cart it will render this
  if (cartItems.length === 0)
    return (
      <div className={style.emptyCartMessage}>
        <h2>Your cart is currently empty.</h2>
        <p>Browse our products and add something to your cart!</p>
        <h1>
          <button className={style.homeBtn} onClick={handleNavigateHome}>
            Home
          </button>
        </h1>
      </div>
    );

  // When cart has items it will render this
  return (
    <div className={style.cartPageContainer}>
      <h1>
        <button className={style.homeBtn} onClick={handleNavigateHome}>
          Home
        </button>
      </h1>
      <h1>Don't Miss Out - Your Items Are Just a Click Away!</h1>
      <div className={style.cartItemsGrid}>
        {/* Passing all the cart items to the product card */}
        {cartItems.map((item) => {
          const product = allProduct.find((p) => p.id === item.id);
          return (
            <ProductCartCard key={item.id} item={item} product={product} />
          );
        })}
      </div>
    </div>
  );
};

export default ProductCartPage;
