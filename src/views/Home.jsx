import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";
import { CartWidget } from "../components/CartWidget";
import data from "../data/currencies.json";

export const Home = () => {
  const [currencies, setCurrencies] = useState([]);
  const [cart, setCart] = useState({});
  const { currencyId } = useParams();

  useEffect(() => {
    if (currencyId) {
      const currenciesFilteredByCategory = data.filter(
        (currency) => currency.category === currencyId
      );
      const initialCartState = {};
      currenciesFilteredByCategory.forEach((currency) => {
        initialCartState[currency.id] = {};
      });
      setCart(initialCartState);
      setCurrencies(currenciesFilteredByCategory);
    } else {
      const initialCartState = {};
      data.forEach((currency) => {
        initialCartState[currency.id] = {};
      });
      setCart(initialCartState);
      setCurrencies(data);
    }
  }, [currencyId]);

  const addToCart = (currencyId) => {
    console.log(`Added currency with ID ${currencyId} to the cart`);
  };

  return (
    <Container>
      <div className="d-flex container flex-wrap">
        {currencies.map((currency) => (
          <Card key={currency.id}>
            <Card.Img variant="top" src={currency.img} height="200" />
            <Card.Body>
              <Card.Title>{currency.type}</Card.Title>
              <Card.Text>{currency.description}</Card.Text>
              <Link to={`/currencies/${currency.id}`}>
                <Button variant="primary">Detalles</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
      <CartWidget cart={cart} addToCart={addToCart} />
    </Container>
  );
};
