import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Form, Button, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export const CheckoutForm = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const [buyerDetails, setBuyerDetails] = useState({
    name: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    confirmEmail: "",
  });

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

  const handleBuy = () => {
    // Handle buy logic
    // clearCart();
    // Swal.fire('Compra realizada con éxito', '', 'success');
  };

  const handleCancel = () => (
    <Link to={`/`}>
      <button>Cancelar</button>
    </Link>
  );

  const totalAmountToPay = cart.reduce(
    (total, currency) => total + parseFloat(currency.price),
    0
  ).toFixed(2);

  return (
    <div className="checkout-page">
      <div className="checkout-cart">
        {cart.map((currency) => (
          <div key={currency.id} className="checkout-currency">
            <div className="checkout-details">
                <span className="checkout-img"><img src={currency.img} alt={currency.type} /></span>
              <span className="checkout-type">Monto a comprar: ${currency.amount} {(currency.type).charAt(0).toLowerCase()}{(currency.type).substring(1)}</span>
              <span className="checkout-total">
                Total a pagar: ${currency.price}
              </span>
            </div>
            <div className="checkout-buttons">
              <button onClick={() => handleRemove(currency.id)}>
                Eliminar
              </button>
              {handleEdit(currency.id)}
            </div>
          </div>
        ))}
      </div>
      <div className="total-to-pay">
        <p>Total a pagar en esta operación: <b>${totalAmountToPay}</b></p>
      </div>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formName">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su nombre"
              value={buyerDetails.name}
              onChange={(e) =>
                setBuyerDetails({ ...buyerDetails, name: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formLastName">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su apellido"
              value={buyerDetails.lastName}
              onChange={(e) =>
                setBuyerDetails({ ...buyerDetails, lastName: e.target.value })
              }
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formPhoneNumber">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese su número de teléfono"
              value={buyerDetails.phoneNumber}
              onChange={(e) =>
                setBuyerDetails({
                  ...buyerDetails,
                  phoneNumber: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingrese su correo electrónico"
              value={buyerDetails.email}
              onChange={(e) =>
                setBuyerDetails({ ...buyerDetails, email: e.target.value })
              }
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formConfirmEmail">
            <Form.Label>Confirmar Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Confirme su correo electrónico"
              value={buyerDetails.confirmEmail}
              onChange={(e) =>
                setBuyerDetails({
                  ...buyerDetails,
                  confirmEmail: e.target.value,
                })
              }
            />
          </Form.Group>
        </Row>
              <div className="checkout-final-buttons">
        <Button variant="primary" onClick={handleBuy}>
          Comprar
        </Button>
        {handleCancel()}
        </div>
      </Form>
    </div>
  );
};
