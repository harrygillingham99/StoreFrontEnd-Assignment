import React from "react";
import { Card, CardDeck, Spinner } from "react-bootstrap";
import { StoreItem } from "../services/Client";

interface IProductContainerProps {
  products?: StoreItem[];
}
export const ProductContainer = (props: IProductContainerProps) => {

  return props.products !== undefined ? (
    <CardDeck className="m-2">
      {props.products?.map(({ name, price }) => (
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer. {price}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Added:</small>
          </Card.Footer>
        </Card>
      ))}
    </CardDeck>
  ): <Spinner animation={"border"}></Spinner>;
};
