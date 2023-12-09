import React from "react";
import { ItemList } from "./ItemList";
import hookICL from "../hooks/HookICL";
import { useParams } from "react-router-dom";
import { Error404 } from './Error404';


export const ItemListContainer = () => {
  const { category } = useParams();
  const { data: currencies, loading, error } = hookICL("items");

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <Error404 />;
  }

  const filteredCurrencies = category
    ? currencies.filter((currency) => currency.category === category)
    : currencies;

  return <ItemList currencies={filteredCurrencies} />;
};
