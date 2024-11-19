import { useNavigate } from "react-router-dom"; // For navigation
import style from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // Pass the product details as state when navigating to the product pathe
  const handleViewDetails = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className={style.container}>
      {/* Image container */}
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
        <button className={style.cardBtn} onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
