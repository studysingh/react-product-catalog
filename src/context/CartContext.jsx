import React, { createContext, useState, useEffect } from "react";

// Create the Context
const CartContext = createContext();

// Create a Provider component to manage the cart state
export const CartProvider = ({ children }) => {
  // Getting the items from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  /* If the product is already in cart , it will increase its quantity ,
   otherwise add the product to cart */
  const handleAddToCart = (product) => {
    // Check if the product is already in the cart
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      // If it already exists, increase the quantity
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If it doesn't exist, add the product to the cart
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Function to remove product from the cart
  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        handleAddToCart,
        handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
