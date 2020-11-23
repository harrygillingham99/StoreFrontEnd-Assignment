import React from "react";
import { Card, Button, CardGroup, Col, Image, Row, Spinner } from "react-bootstrap";
import { AppAlertContainer } from "../state/AppAlertState";
import { AppContainer } from "../state/AppState";
import { Loader } from "./Loader";

export const ProductContainer = () => {
  const {alert} = AppAlertContainer.useContainer();
  const {AddItemToBasket, products} = AppContainer.useContainer();
  return products !== undefined ? (
      <CardGroup style={{width: '100%'}}>
      <Row className="mt-4">
        {products?.map(
          ({ name, description, pricePerUnit, imageUrl, dateCreated, id }) => (
              <Col md={2} className="m-2" key={`${id}-col`}>
              <Card style={{ height: "100%"}}>
              <Card.Body>
              <Card.Title className='text-center'>{name}</Card.Title>
                <Image src={imageUrl} thumbnail />
                  <Card.Text>{description}</Card.Text>
                  <Card.Text>Price per unit: £{pricePerUnit}</Card.Text>
                </Card.Body>
                <Card.Footer>
                <Button onClick={() =>AddItemToBasket(id)} title="Add to basket">Add To Basket</Button>
                </Card.Footer>
                <Card.Footer>
                  <small className="text-muted">Added: {dateCreated?.toDateString()}</small>
                  </Card.Footer>
              </Card>
              </Col>
          )     
        )}
        </Row>
      </CardGroup>
      
  ) : !alert.showAlert ? (
    <div className="text-center">
      <Loader />
    </div>)
   : (<></>)
};
