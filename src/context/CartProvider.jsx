import { useState } from "react";
import PropTypes from "prop-types";
import { CartContext } from "./CartContext";

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    const findCartItem = cartItems.find((item) => item.id === product.id);
    if (findCartItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === findCartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prevCartItems) => [
        { ...product, quantity: 1 },
        ...prevCartItems,
      ]);
    }
  }

  console.log(cartItems);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export default CartProvider;