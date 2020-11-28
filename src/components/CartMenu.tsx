import React from "react";
import cart from "../assets/shopping-cart.svg";
import { Badge, Button, ListGroup, Modal } from "react-bootstrap";
import { AppContainer } from "../state/AppState";

interface CartMenuProps {
  show: boolean;
}

export const CartMenu = (props: CartMenuProps) => {
  const [basketModal, toggleBasketModal] = React.useState<boolean>(false);
  const { basket, itemsInBasket } = AppContainer.useContainer();
  const display = props.show ? "flex" : "none";
  return (
    <>
      <div style={{ display: display }}>
        <Badge
          variant="light"
          className="mr-2 btn btn-light"
          onClick={() => toggleBasketModal(true)}
        >
          <img src={cart} className="mr-1 mt-1" />
          <span style={{ verticalAlign: "top" }}>{basket.length}</span>
        </Badge>
      </div>
      <Modal show={basketModal} onHide={toggleBasketModal}>
        <Modal.Header closeButton>
          <Modal.Title>Your Basket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {basket.length > 0 ? (
            <ListGroup>
              {itemsInBasket().map(({ name, pricePerUnit, description, id }) => (
                <ListGroup.Item id={`${id}-basket-item`}>
                  {name} - {description} £{pricePerUnit}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <span>Your basket is empty!</span>
          )}
        </Modal.Body>
        <Modal.Footer>
        <Button variant="primary" onClick={() => toggleBasketModal(false)} disabled={basket.length === 0}>
            Place order
          </Button>
          <Button variant="secondary" onClick={() => toggleBasketModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
