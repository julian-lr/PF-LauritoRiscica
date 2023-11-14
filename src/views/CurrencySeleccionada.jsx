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
      <p>{currency.description}</p>

      <div>
        {[5, 10, 50, 100, 1000].map((amount) => (
          <div key={amount} className="amount-button-container">
            <button
              className="amount-button"
              onClick={() => handleDecrement(amount)}
            >
              -
            </button>
            <button
              className={`amount-button ${
                currentAmount === amount ? "selected" : ""
              }`}
              onClick={() => handleAmountButtonClick(amount)}
            >
              {amount}
            </button>
            <button
              className="amount-button"
              onClick={() => handleIncrement(amount)}
            >
              +
            </button>
          </div>
        ))}
      </div>

      <label htmlFor="currentAmount">Amount to Buy:</label>
      <input
        type="text"
        id="currentAmount"
        value={currentAmount}
        readOnly
      />
      <button onClick={handleBuyButtonClick}>Buy</button>
    </main>
  );
};
