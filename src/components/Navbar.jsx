import React, { useContext, useState } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Import the shopping cart icon from react-icons
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router";
import CartContext from "../context/CartContext";

/* Getting the required variables and function through props */
const Navbar = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  selectedSort,
  setSelectedSort,
  categories,
}) => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  const sortingOptions = ["Price: Low to High", "Price: High to Low"];

  // Updating the changes for various features
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <input
          type="text"
          className={styles.searchBar}
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Rendering the categories dynamically */}
        <select
          className={styles.filter}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Rendering the sorting conditions dynamically */}
        <select
          className={styles.sorting}
          value={selectedSort}
          onChange={handleSortChange}
        >
          <option value="">Sort by</option>
          {sortingOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Cart Items */}
      <div className={styles.navRight}>
        <div
          className={styles.cartIcon}
          onClick={() => {
            navigate("/cart");
          }}
        >
          <span className={styles.cartCount}>{cartItems.length}</span>
          <FaShoppingCart className={styles.cart} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
