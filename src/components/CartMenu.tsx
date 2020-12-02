import React from "react";
import cart from "../assets/shopping-cart.svg";
import { Badge, Button, ListGroup, Modal } from "react-bootstrap";
import { AppContainer } from "../state/AppState";
import { PlaceOrder } from "../utils/Orders";
import firebase from "firebase/app";
import { Basket } from "../services/Client";

interface CartMenuProps {
  show: boolean;
}

export const CartMenu = (props: CartMenuProps) => {
  const [basketModal, toggleBasketModal] = React.useState<boolean>(false);
  const {
    basket,
    itemsInBasket,
    RemoveItemFromBasket,
    user,
    ClearBasket,
  } = AppContainer.useContainer();
  const display = props.show ? "flex" : "none";
  const OnPlaceOrderClick = (
    user: firebase.User | undefined,
    basket: Basket
  ) => {
    ClearBasket();
    PlaceOrder(user, basket);
    toggleBasketModal(false);
  };
  return (
    <>
      <div style={{ display: display }}>
        <Badge
          variant="light"
          className="mr-2 btn btn-light"
          onClick={() => toggleBasketModal(true)}
        >
          <img src={cart} className="mr-1 mt-1" alt="cart icon" />
          <span style={{ verticalAlign: "top" }}>
            {basket?.productAndQuantity?.length ?? 0}
          </span>
        </Badge>
      </div>
      <Modal show={basketModal} onHide={toggleBasketModal}>
        <Modal.Header closeButton>
          <Modal.Title>Your Basket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {basket?.productAndQuantity !== undefined &&
          basket?.productAndQuantity.length > 0 ? (
            <ListGroup>
              {itemsInBasket().map(
                ({ name, pricePerUnit, description, id }) => (
                  <ListGroup.Item key={`${name}-basket-item`}>
                    {name} - {description} £{pricePerUnit}
                    <Button
                      onClick={() => {
                        toggleBasketModal(false)
                        RemoveItemFromBasket(id);
                      }}
                    >
                      Remove item
                    </Button>
                  </ListGroup.Item>
                )
              )}
            </ListGroup>
          ) : (
            <span>Your basket is empty!</span>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => OnPlaceOrderClick(user, basket)}
            disabled={
              basket === null ||
              basket === undefined ||
              basket.productAndQuantity === undefined ||
              basket.productAndQuantity?.length === 0
            }
          >
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
