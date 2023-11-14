import React, { useState } from "react";
import "../App.css"

export const CartWidget = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (currency) => {
    const updatedCart = [...cart, currency];
    setCart(updatedCart);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  return (
    <div className="cart-widget">
      <div className="cart-icon" onClick={() => setIsCartOpen(!isCartOpen)}>
        <img src="https://raw.githubusercontent.com/julian-lr/Preentrega2-LauritoRiscica/main/src/assets/cart-logo.png" alt="Cart" width="24px" />
        <span className="currency-count">{cart.length}</span>
      </div>
      {isCartOpen && (
        <div className="cart-currencies">
          {cart.map((currency, index) => (
            <div key={index} className="cart-currency">
              <span>{currency.type}</span>
              <span>${currency.price}</span>
              <button onClick={() => removeFromCart(index)}>Eliminar</button>
              <button onClick={() => addToCart(currency)}>Agregar más</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



