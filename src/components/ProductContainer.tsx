import React from "react";
import {
  Card,
  Button,
  CardGroup,
  Col,
  Image,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { Product } from "../services/Client";
import { AppAlertContainer } from "../state/AppAlertState";
import { AppContainer } from "../state/AppState";
import { GetCategories } from "../utils/Categories";
import { GetProducts } from "../utils/Products";
import { Loader } from "./Loader";

export const ProductContainer = () => {
  const { alert, ToggleAlert } = AppAlertContainer.useContainer();
  const [allProducts, setAllProducts] = React.useState<Product[]>([])
  const {
    AddItemToBasket,
    products,
    categories,
    setProducts,
    setCategories,
  } = AppContainer.useContainer();

  React.useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        const productResult = await GetProducts();
        const categoryResult = await GetCategories();
        if (productResult && categoryResult) {
          setProducts(productResult);
          setAllProducts(productResult)
          setCategories(categoryResult);
        } else throw new Error("Failed to get products");
      } catch (ex) {
        ToggleAlert(
          true,
          "danger",
          "Error!",
          "Failed to fetch the latest products"
        );
      }
    };
    fetchProductsAndCategories();
  }, [setProducts, ToggleAlert, setCategories]);

  const FilterProducts = (categoryId: number | undefined) => {
    if (categoryId === undefined) {
      GetProducts().then(res => setProducts(res))
    }
    setProducts(allProducts.filter((x) => x.categoryId === categoryId));
  };

  return products !== undefined && categories !== undefined ? (
    <>
      <div className="pb-3 float-right pr-3">
        <DropdownButton
          id="dropdown-basic-button"
          title="Filter Product Category"
        >
          <Dropdown.Item onClick={() => FilterProducts(undefined)}>
            All
          </Dropdown.Item>
          {categories.map(({ category, id }) => (
            <Dropdown.Item onClick={() => FilterProducts(id)} key={`${category}-dropdown-item`}>
              {category}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <CardGroup style={{ width: "100%" }}>
        {products.map((product) => (
          <Col md={2} className="m-2" key={`${product.id}-col`}>
            <Card style={{ height: "100%" }}>
              <Card.Body>
                <Card.Title className="text-center">{product.name}</Card.Title>
                <Image src={product.imageUrl} thumbnail />
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price per unit: £{product.pricePerUnit}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Button
                  onClick={() => AddItemToBasket(product.id)}
                  title="Add to basket"
                >
                  Add To Basket
                </Button>
              </Card.Footer>
              <Card.Footer>
                <small className="text-muted">
                  Added: {product.dateCreated?.toDateString()}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
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
