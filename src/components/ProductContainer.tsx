import React from "react";
import {
  Card,
  Button,
  CardGroup,
  Col,
  Image,
  Dropdown,
  DropdownButton,
  Form,
} from "react-bootstrap";
import { AppAlertContainer } from "../state/AppAlertState";
import { AppContainer } from "../state/AppState";
import { Loader } from "./Loader";

export const ProductContainer = () => {
  const { alert, ToggleAlert } = AppAlertContainer.useContainer();

  const [quantity, setQuantity] = React.useState<number>(1);

  const {
    AddItemToBasket,
    getProducts,
    getCategories,
    setProducts,
    allProducts,
  } = AppContainer.useContainer();

  const productsList = getProducts();

  const categories = getCategories();

  const FilterProducts = (categoryId: number | undefined) => {
    if (categoryId !== undefined) {
      setProducts(allProducts.filter((x) => x.categoryId === categoryId));
    }
  };

  return productsList !== undefined && categories !== undefined ? (
    <>
      <div className="pb-3 float-right pr-3">
        <DropdownButton
          id="dropdown-basic-button"
          title="Filter Product Category"
        >
          <Dropdown.Item onClick={() => setProducts(allProducts)}>
            All
          </Dropdown.Item>
          {categories.map(({ category, id }) => (
            <Dropdown.Item
              onClick={() => FilterProducts(id)}
              key={`${category}-dropdown-item`}
            >
              {category}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <CardGroup style={{ width: "100%" }}>
        {productsList.map((product) => {
          return (
            <Col md={2} className="m-2" key={`${product.dataStoreId}-col`}>
              <Card style={{ height: "100%" }}>
                <Card.Body>
                  <Card.Title className="text-center">
                    {product.name}
                  </Card.Title>
                  <Image src={product.imageUrl} thumbnail />
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>Price per unit: £{product.pricePerUnit}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <Form>
                    <Form.Row>
                      <Col>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="0"
                          defaultValue={1}
                          onChange={(evt) => {
                            setQuantity(Number.parseInt(evt.target.value));
                          }}
                        />
                      </Col>
                      <Col>
                        <Button
                          onClick={() => {
                            if(quantity <= 0){
                              ToggleAlert(true, "danger", "Error!", "Please enter a valid quantity of products");
                              return;
                            } 
                            AddItemToBasket(product.id, quantity)}}
                          title="Add to basket"
                          className="h-100"
                        >
                          Add To Basket
                        </Button>
                      </Col>
                    </Form.Row>
                  </Form>
                </Card.Footer>
                <Card.Footer>
                  <small className="text-muted">
                    Added: {product.dateCreated?.toDateString()}
                  </small>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </CardGroup>
    </>
  ) : !alert.showAlert ? (
    <div className="text-center">
      <Loader />
    </div>
  ) : (
    <></>
  );
};
