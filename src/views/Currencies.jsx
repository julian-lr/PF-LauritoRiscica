import { Link, useParams } from "react-router-dom";
import currencies from "../data/currencies.json";
import { Container, Card, Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";

export const Currencies = () => {
  const { categoryId } = useParams();
  const [filterCurrencies, setFilterCurrencies] = useState([]);

  useEffect(() => {
    const newFilterCurrencies = currencies.filter(
      (currency) => currency.category === categoryId
    );

    setFilterCurrencies(newFilterCurrencies);
  }, [categoryId]);

  return (
    <Container>
      <div className="d-flex container flex-wrap">
        {filterCurrencies.map((currency) => (
          <Card key={currency.id}>
            <Card.Img variant="top" src={currency.img} height="200" />
            <Card.Body>
              <Card.Title>{currency.type}</Card.Title>
              <Card.Text>${currency.valueInARS}</Card.Text>
              <Card.Text>Plazo de: {currency.delivery}</Card.Text>
              <Card.Text>{currency.description}</Card.Text>
              <Link to={`/currencies/${currency.id}`}>
                <Button variant="primary">Detalles</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
};