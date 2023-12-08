import React, { useEffect, useState } from "react";
import { ItemList } from "./ItemList";
import currenciesData from "../data/currencies.json";

export const ItemListContainer = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    // Fetch or manipulate data as needed
    setCurrencies(currenciesData);
  }, []);

  return <ItemList currencies={currencies} />;
};