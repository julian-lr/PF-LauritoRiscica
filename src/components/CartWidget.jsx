import React, { useState } from "react";
import "../App.css"

export const CartWidget = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
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
        <img src="./src/assets/cart-logo.png" alt="Cart" width="24px" />
        <span className="item-count">{cart.length}</span>
      </div>
      {isCartOpen && (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <span>{item.name}</span>
              <span>${item.price}</span>
              <button onClick={() => removeFromCart(index)}>Eliminar</button>
              <button onClick={() => addToCart(item)}>Agregar más</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* IGNORAR, ESTO ES PARA DESPUES.
<div className="store-items">
        <div className="store-item">
          <span>Producto 1</span>
          <span>$10.00</span>
          <button onClick={() => addToCart({ name: "Producto 1", price: 10 })}>Agregar al Carrito</button>
        </div>
        <div className="store-item">
          <span>Producto 2</span>
          <span>$15.00</span>
          <button onClick={() => addToCart({ name: "Producto 2", price: 15 })}>Agregar al Carrito</button>
        </div>
      </div>
*/
