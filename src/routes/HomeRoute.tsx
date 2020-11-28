import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { ProductContainer } from "../components/ProductContainer";

export const HomeRoute = () => {
  return (
    <>
      <Jumbotron fluid>
        <Container>
          <h1>Ninebarrow Pet Supplies</h1>
          <p>Welcome to our new website. We hope you enjoy your stay.</p>
        </Container>
      </Jumbotron>
      <ProductContainer />
    </>
  );
};
