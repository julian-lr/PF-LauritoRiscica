import React, { useEffect, useState } from "react";
import { ItemDetail } from "./ItemDetail";
import currenciesData from "../data/currencies.json";
import { useParams } from "react-router-dom";

export const ItemDetailContainer = () => {
  const { id } = useParams();

  const [currency, setCurrency] = useState(null);

  useEffect(() => {
    const selectedCurrency = currenciesData.find((currency) => currency.id === Number(id));
    setCurrency(selectedCurrency);
  }, [id]);

  return <ItemDetail currency={currency} />;
};
