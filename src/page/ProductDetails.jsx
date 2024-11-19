import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./ProductDetails.module.css";
import CartContext from "../context/CartContext";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { handleAddToCart } = useContext(CartContext);

  // Extract the product object passed via state
  const { product } = location.state || {};

  // Rendering this UI when the product is not got
  if (!product) {
    return (
      <div className={style.notFoundContainer}>
        <div className={style.notFoundMessage}>
          <h2>Product Not Found</h2>
          <p>We couldn't find the product you are looking for.</p>
          <button
            className={`${style.detailBtn} ${style.seeAllProduct}`}
            onClick={() => {
              navigate("/"); // Navigate to the homepage when clicked for home
            }}
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={style.productContainer}>
      {/* Showing all the images */}
      <div className={style.imageContainer}>
        {product.urls.map((url, index) => (
          <img key={index} src={url} alt={product.name} />
        ))}
      </div>
      {/* Showing all other details of the product */}
      <div className={style.detailsContainer}>
        <p className={style.productName}>{product.name}</p>
        <p className={style.productCategory}>{product.category}</p>
        <p className={style.productPrice}>₹{product.price}</p>
        <p className={style.productDescription}>{product.description}</p>
        <button
          className={`${style.detailBtn} ${style.seeAllProduct}`}
          onClick={() => {
            navigate("/"); // Navigate to the homepage
          }}
        >
          See All Products
        </button>
        <button
          className={`${style.detailBtn} ${style.cartBtn}`}
          onClick={() => {
            handleAddToCart(product);
            navigate("/cart"); // After adding the product to the cart , Navigate to the cart
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
