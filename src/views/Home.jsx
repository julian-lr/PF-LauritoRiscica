import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ItemDetailContainer } from "../components/ItemDetailContainer";
import { ItemListContainer } from "../components/ItemListContainer";

export const Home = () => {
  const { id, category } = useParams();

  return (
    <Container>
      {id ? (
        <ItemDetailContainer />
      ) : (
        <ItemListContainer category={category} />
      )}
    </Container>
  );
};
