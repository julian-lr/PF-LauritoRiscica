import React from "react";
import { ItemList } from "./ItemList";
import hookICL from "../hooks/HookICL";
import { useParams } from "react-router-dom";

export const ItemListContainer = () => {
  const { category } = useParams();
  const { data: currencies, loading, error } = hookICL("items");

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const filteredCurrencies = category
    ? currencies.filter((currency) => currency.category === category)
    : currencies;

  return <ItemList currencies={filteredCurrencies} />;
};
