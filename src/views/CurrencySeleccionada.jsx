import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import currencies from "../data/currencies.json";

export const CurrencySeleccionada = () => {
  const [currency, setCurrency] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [currentAmount, setCurrentAmount] = useState(5);

  const { id } = useParams();

  useEffect(() => {
    const selectedCurrency = currencies.find(
      (currency) => currency.id === Number(id)
    );
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
      amount: currentAmount,
      type: currency.type,
    };

    setPurchases((prevPurchases) => [...prevPurchases, newPurchase]);
    setCurrentAmount(0);

    console.table(purchases);
  };

  return (
    <main>
      <h1>Detalle de la divisa:</h1>
      <h2>{currency.type}</h2>
      <img width={300} src={currency.img} alt={currency.type} />
      <p>- Actualmente cotiza ${currency.valueInARS}</p>
      <p>- Plazo de entrega: {currency.delivery}</p>
      <p>- {currency.description}</p>

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
      <input
        type="text"
        id="currentAmount"
        value={currentAmount}
        readOnly
      />
      </div>
      <div className="buy-button">
      <button onClick={handleBuyButtonClick}>Comprar</button>
      </div>
    </main>
  );
};
