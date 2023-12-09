import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import currencies from "../data/currencies.json";

export const ItemDetail = () => {
  const { addToCart } = useCart();
  const [currency, setCurrency] = useState(null);
  const [currentAmount, setCurrentAmount] = useState(5);

  const { id } = useParams();

  useEffect(() => {
    const selectedCurrency = currencies.find((currency) => currency.id === Number(id));
    setCurrency(selectedCurrency);
  }, [id]);
  

  if (!currency) return <div>Cargando...</div>;

  const handleAmountButtonClick = (amount) => {
    setCurrentAmount(amount);
  };

  const handleIncrement = (amount) => {
    setCurrentAmount(currentAmount + amount);
  };

  const handleDecrement = (amount) => {
    if (currentAmount >= amount) {
      setCurrentAmount(currentAmount - amount);
    }
  };

  const handleBuyButtonClick = () => {
    const newPurchase = {
      id: currency.id,
      value: currency.valueInARS,
      amount: currentAmount,
      type: currency.type,
      price: (currency.valueInARS * currentAmount).toFixed(2),
    };

    addToCart(newPurchase);
    setCurrentAmount(0);
  };

  return (
    <main>
      <h1>Detalle de la divisa:</h1>
      <div className="info-card">
        <h2>{currency.type}</h2>
        <img width={150} src={currency.img} alt={currency.type} />
        <p>Actualmente cotiza ${currency.valueInARS}</p>
        <p>Plazo de entrega: {currency.delivery}</p>
        <p>{currency.description}</p>
      </div>
      <div className="adjust-amount-buttons">
        {[5, 10, 50, 100, 1000].map((amount) => (
          <div key={amount} className="amount-button-container">
            <button
              className="amount-button sign-item sign-minus"
              onClick={() => handleDecrement(amount)}
            >
              -
            </button>
            <button
              className={`amount-button value-item ${
                currentAmount === amount ? "selected" : ""
              }`}
              onClick={() => handleAmountButtonClick(amount)}
            >
              {amount}
            </button>
            <button
              className="amount-button sign-item sign-plus"
              onClick={() => handleIncrement(amount)}
            >
              +
            </button>
          </div>
        ))}
      </div>
      <div className="amount-to-buy">
        <label htmlFor="currentAmount">Cantidad a comprar: </label>
        <input type="text" id="currentAmount" value={currentAmount} readOnly />
        <span className="monto-a-pagar">
          Estarías abonando: ${(currency.valueInARS * currentAmount).toFixed(2)}
        </span>
      </div>
      <div className="buy-button">
        <button onClick={handleBuyButtonClick}>Agregar al carrito</button>
      </div>
    </main>
  );
};