import React, { useContext, useEffect, useState } from "react";
import style from "./ProductPage.module.css";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/NavBar";
import CartContext from "../context/CartContext";

const ProductPage = ({ allProduct }) => {
  const { handleAddToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [products, setProducts] = useState([]); // For the filtration
  const [categories, setCategories] = useState([
    "Electronics",
    "Health & Beauty",
    "Home Appliances",
    "Sports & Outdoors",
  ]);

  // Searching , categorization and sorting techniques
  useEffect(() => {
    // Search functionality: Filter products where name contains the substring searchTerm
    let searchedProduct = [...allProduct]; // Creating shallowcopy of allProduct

    if (searchTerm) {
      searchedProduct = searchedProduct.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter functionality
    let categorizedProduct = [...searchedProduct]; // Creating shallowcopy of searchedProduct
    if (selectedCategory) {
      categorizedProduct = categorizedProduct.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sorting functionality
    let sortedProduct = [...categorizedProduct]; // Creating shallowcopy of categorizedData
    if (selectedSort === "Price: Low to High") {
      sortedProduct.sort((a, b) => a.price - b.price); // Ascending order
    } else if (selectedSort === "Price: High to Low") {
      sortedProduct.sort((a, b) => b.price - a.price); // Descending order
    }

    setProducts(sortedProduct);
  }, [searchTerm, selectedCategory, selectedSort]);

  return (
    <>
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
        categories={categories} // Pass the dynamically generated categories to Navbar
      />
      {products.length === 0 ? (
        <h3
          style={{
            textAlign: "center",
            marginTop: "5vh",
          }}
        >
          No products found.
        </h3>
      ) : (
        <div className={style.productPage}>
          <h2>Explore the Latest in Technology and Innovation – Shop Now!</h2>
          <div className={style.productGrid}>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
