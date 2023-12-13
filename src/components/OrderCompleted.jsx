// OrderCompleted.js
import React from "react";
import { useParams } from "react-router-dom";

export const OrderCompleted = () => {
  const { orderNumber } = useParams();

  return (
    <div>
      <h1>Orden realizada</h1>
      <p>Tu ID de orden es: {orderNumber}</p>
      <p>Para concretar la compra, necesitamos que ingreses los siguientes datos:</p>
      {/* Add your credit card form here */}
    </div>
  );
};