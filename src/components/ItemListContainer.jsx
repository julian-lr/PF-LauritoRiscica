import React, { useEffect, useState } from "react";
import { ItemList } from "./ItemList";
import currenciesData from "../data/currencies.json";
import { useParams } from "react-router-dom";

export const ItemListContainer = () => {
  const [currencies, setCurrencies] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    // Fetch or manipulate data as needed
    if (category) {
      // Filter currencies based on the category
      const filteredCurrencies = currenciesData.filter(
        (currency) => currency.category === category
      );
      setCurrencies(filteredCurrencies);
    } else {
      // If no category is specified, show all currencies
      setCurrencies(currenciesData);
    }
  }, [category]);

  return <ItemList currencies={currencies} />;
};
