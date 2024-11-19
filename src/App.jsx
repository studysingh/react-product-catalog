import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProductPage from "./page/ProductPage";
import ProductDetails from "./page/ProductDetails";
import ProductCart from "./page/ProductCart";
import CartContext, { CartProvider } from "./context/CartContext";
import { useContext, useEffect, useState } from "react";
import Loader from "./components/Loader";

function App() {
  const [allProduct, setAllProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching all the products from API
  useEffect(() => {
    const apiUrl = "https://dummyjson.com/c/c60d-8af9-45dd-a9d2";

    const fetchProducts = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        const products = data.products;

        // Setting the initial products
        setAllProduct(products || []);
        setLoading(false); // Update the loading state
      } catch (error) {
        setError(error.message);
        setLoading(false); // Update the loading state on error
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setAllProduct(allProduct);
  }, [allProduct]);

  // Loading Component Style
  const loaderStyle = {
    display: "flex",
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  };

  if (loading) {
    return (
      <div style={loaderStyle}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Some Error Occured ...</div>;
  }

  return (
    <CartProvider>
      <Router basename="/react-product-catalog">
        <Routes>
          <Route path="/" element={<ProductPage allProduct={allProduct} />} />
          <Route
            path="/product/:id"
            element={<ProductDetails allProduct={allProduct} />}
          />
          <Route
            path="/cart"
            element={<ProductCart allProduct={allProduct} />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
