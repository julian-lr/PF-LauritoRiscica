// ItemDetailContainer.jsx
import React, { useState, useEffect } from "react";
import { ItemDetail } from "./ItemDetail";
import currenciesData from "../data/currencies.json";

const ItemDetailContainer = ({ id }) => {
  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    const selectedCurrency = currenciesData.find(
      (currency) => currency.id === Number(id)
    );
    setCurrency(selectedCurrency);
  }, [id]);

  return <ItemDetail currency={currency} />;
};

export default ItemDetailContainer;
