import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

export const ItemList = ({ currencies }) => {
  return (
    <Container>
      <div className="d-flex container flex-wrap">
        {currencies
          .filter((currency) => currency.stock > 0)
          .map((currency) => (
            <Card key={currency.id}>
              <Card.Img variant="top" src={currency.img} height="200" />
              <Card.Body>
                <Card.Title>{currency.type}</Card.Title>
                <Card.Text>${currency.valueInARS}</Card.Text>
                <Card.Text>Stock: ${currency.stock.toLocaleString('es-AR')}</Card.Text>
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
