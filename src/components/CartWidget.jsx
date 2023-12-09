import React from "react";
import { useCart } from "../contexts/CartContext";
import { Badge, OverlayTrigger, Popover } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import "../App.css";

export const CartWidget = () => {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  const handleEdit = (currencyId) => (
    <Link to={`/currencies/${currencyId}`}>
      <button>Editar</button>
    </Link>
  );

  const handleRemove = (currencyId) => {
    Swal.fire({
      title: "¿Estás seguro de eliminar esta orden del carrito?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(currencyId);
        Swal.fire("Orden eliminada del carrito", "", "success");
      }
    });
  };

  const handleRemoveAll = () => {
    Swal.fire({
      title: "¿Estás seguro de vaciar tu carrito?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        clearCart();
        Swal.fire("Carrito vaciado", "", "success");
      }
    });
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
                {cart.map((currency) => (
                  <div key={currency.id} className="cart-currency">
                    <div className="cart-details">
                      <span className="cart-type">{currency.type}</span>
                      <span className="cart-amount">
                        Cantidad: ${currency.amount}
                      </span>
                      <span className="cart-total">
                        Total a pagar: ${currency.price}
                      </span>
                    </div>
                    <div className="cart-buttons">
                      <button onClick={() => handleRemove(currency.id)}>
                        Eliminar
                      </button>
                      {handleEdit(currency.id)}
                    </div>
                  </div>
                ))}
                <div className="cart-actions">
                  <button onClick={handleRemoveAll} className="remove-all-btn">
                    Vaciar Carrito
                  </button>
                  <Link to="/checkout">
                    <button className="checkout-btn">Checkout</button>
                  </Link>
                </div>
              </>
            ) : (
              <p>Tu carrito está vacío</p>
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
