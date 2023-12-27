import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, addDoc } from "firebase/firestore";
import { database } from "../firebasecfg/Config";
import { useCart } from "../contexts/CartContext";
import Swal from "sweetalert2";

export const OrderCompleted = () => {
  const { cart, setCart } = useCart();
  const { orderNumber } = useParams();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cardName: "",
    cardCVC: "",
    cardExpiry: "",
  });
  const [orderedCurrencies, setOrderedCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleInputChange = (field, value) => {
    setPaymentDetails({ ...paymentDetails, [field]: value });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (
      !paymentDetails.cardNumber ||
      !paymentDetails.cardName ||
      !paymentDetails.cardCVC ||
      !paymentDetails.cardExpiry
    ) {
      Swal.fire({
        title: "Campos de la tarjeta incompletos",
        text: "Completa todos los campos de la tarjeta antes de enviar.",
        icon: "warning",
      });
      return;
    }

    const paymentDocRef = doc(database, "pagos", orderNumber);
    await addDoc(paymentDocRef, {
      cardNumber: paymentDetails.cardNumber.slice(-4),
      cardName: paymentDetails.cardName,
      cardCVC: paymentDetails.cardCVC,
      cardExpiry: paymentDetails.cardExpiry,
      payed: true,
    });

    Swal.fire({
      title: "Pago exitoso",
      text: "¡Gracias por tu compra!",
      icon: "success",
    }).then(() => {
        window.location.href = "/";
      });
  };

  useEffect(() => {
    const fetchOrderedCurrencies = async () => {
      try {
        const orderDocRef = doc(database, "compras", orderNumber);
        const orderDocSnapshot = await getDoc(orderDocRef);

        if (orderDocSnapshot.exists()) {
          const orderData = orderDocSnapshot.data();
          setOrderedCurrencies(orderData.order);
        }
      } catch (error) {
        console.error("Error fetching ordered currencies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderedCurrencies();
  }, [orderNumber]);

  return (
    <div>
      <h1>Orden realizada</h1>
      <p>Tu ID de orden es: {orderNumber}</p>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="payment-cart">
          <h2>Estarías adquiriendo:</h2>

          {orderedCurrencies.map((currency) => (
            <div key={currency.currencyId} className="payment-currency">
              <div className="payment-details">
                <span className="payment-img">
                  <img src={currency.img} alt={currency.currencyName} />
                </span>
                <div className="payment-divtt">
                  <span className="payment-type">
                    Monto a comprar: ${currency.amount}{" "}
                    {currency.currencyName.charAt(0).toLowerCase()}
                    {currency.currencyName.substring(1)}
                  </span>
                  <span className="payment-total">
                    Total a pagar: ${currency.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cc-info">
        <p>
          Para concretar la compra, necesitamos que ingreses los siguientes
          datos:
        </p>{" "}
        <form onSubmit={handlePaymentSubmit}>
          <label htmlFor="cardNumber" className="cardnumber-style">
            Número de tarjeta:
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
            required
          />

          <label htmlFor="cardName">Nombre en la tarjeta:</label>
          <input
            type="text"
            id="cardName"
            name="cardName"
            value={paymentDetails.cardName}
            onChange={(e) => handleInputChange("cardName", e.target.value)}
            required
          />

          <label htmlFor="cardCVC">CVC de la tarjeta:</label>
          <input
            type="text"
            id="cardCVC"
            name="cardCVC"
            value={paymentDetails.cardCVC}
            onChange={(e) => handleInputChange("cardCVC", e.target.value)}
            required
          />

          <label htmlFor="cardExpiry">
            Fecha de vencimiento de la tarjeta:
          </label>
          <input
            type="text"
            id="cardExpiry"
            name="cardExpiry"
            value={paymentDetails.cardExpiry}
            onChange={(e) => handleInputChange("cardExpiry", e.target.value)}
            required
          />
          <div className="payment-div-comprar-cta">
            <button type="submit" className="payment-comprar-cta">
              Comprar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
