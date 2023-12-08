import React from "react";
import { useCart } from "../contexts/CartContext";
import { Badge, OverlayTrigger, Popover } from "react-bootstrap";
import "../App.css";

export const CartWidget = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const handleEdit = (index, updatedValue) => {
    // Implement the logic to edit the selected value in the cart
    // This function will be called when the "Edit" button is clicked
  };

  const handleRemoveAll = () => {
    clearCart();
    };

  const handleCheckout = () => {
    // Implement the logic to handle the checkout
    // This function will be called when the "Checkout" button is clicked
    // You can navigate to another page or show a confirmation modal
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement="bottom-end"
      overlay={
        <Popover id="cart-popover" className="cart-popover">
          <Popover.Header as="h3">Changuito</Popover.Header>
          <Popover.Body>
            {cart.length > 0 ? (
              <>
                {cart.map((currency, index) => (
                  <div key={index} className="cart-currency">
                    <div className="cart-details">
                      <span className="cart-type">{currency.type}</span>
                      <span className="cart-amount">Cantidad: ${currency.amount}</span>
                      <span className="cart-total">Total a pagar: ${currency.price}</span>
                    </div>
                    <div className="cart-buttons">
                      <button onClick={() => removeFromCart(index)}>Eliminar</button>
                      <button onClick={() => handleEdit(index, /* Updated Value */)}>
                        Editar
                      </button>
                    </div>
                  </div>
                ))}
                <div className="cart-actions">
                  <button onClick={handleRemoveAll} className="remove-all-btn">
                    Remove All
                  </button>
                  <button onClick={handleCheckout} className="checkout-btn">
                    Checkout
                  </button>
                </div>
              </>
            ) : (
              <p>Tu carrito esta vacío</p>
            )}
          </Popover.Body>
        </Popover>
      }
    >
      <div className="cart-widget">
        <div className="cart-icon">
          <img
            src="https://raw.githubusercontent.com/julian-lr/Preentrega2-LauritoRiscica/main/src/assets/cart-logo.png"
            alt="Cart"
            width="24px"
          />
          <Badge pill bg="danger" className="currency-count">
            {cart.length}
          </Badge>
        </div>
      </div>
    </OverlayTrigger>
  );
};
