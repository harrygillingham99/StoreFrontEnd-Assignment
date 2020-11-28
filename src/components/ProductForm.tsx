import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Product } from "../services/Client";
import { AppAlertContainer } from "../state/AppAlertState";
import { AppContainer } from "../state/AppState";
import { GetProducts, InsertProduct, UpdateProduct } from "../utils/Products";

export const ProductForm = () => {
  const { categories } = AppContainer.useContainer();
  const [products, SetProducts] = React.useState<Product[]>(null!);
  const [productToSubmit, setProductToSubmit] = React.useState<Product>();
  const [newItem, setNewItem] = React.useState<boolean>(true);
  const { ToggleAlert } = AppAlertContainer.useContainer();

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        GetProducts().then((res) => SetProducts(res));
      } catch (ex) {
        ToggleAlert(
          true,
          "danger",
          "Error!",
          "Failed to fetch the latest products"
        );
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = () => {
    console.log(productToSubmit?.id);
    if (products === undefined || productToSubmit === undefined) {
      return;
    }
    if (newItem) {
      productToSubmit.id = products.reduce((a, b) =>
        (a.id ?? 0) > (b.id ?? 0) ? a : b
      ).id;
      InsertProduct(productToSubmit).then((res) =>
        ToggleAlert(
          true,
          res ? "success" : "danger",
          res ? "Success!" : "Error!",
          `${res ? "Success creating" : "Failed to create"} new product.`
        )
      );
    }
    UpdateProduct(productToSubmit).then((res) =>
      ToggleAlert(
        true,
        res ? "success" : "danger",
        res ? "Success!" : "Error!",
        `${res ? "Success updating" : "Failed to update"} the product.`
      )
    );
  };

  const handleSelectedProductChange = (id: string) => {
    if (id === "no-option") {
      setNewItem(true);
      setProductToSubmit(new Product());
      return;
    }
    var selectedProduct = products.find((x) => x.id === Number.parseInt(id));
    setNewItem(false);
    setProductToSubmit(selectedProduct);
  };
  return (
    <Container className="pt-2">
      <Form.Group>
        <Form.Label>Update existing product?</Form.Label>
        <Form.Control
          as="select"
          className="mr-sm-2"
          id="existing-products"
          onChange={(id) => handleSelectedProductChange(id.target.value)}
          custom
        >
          <option value={"no-option"} id={"no-option"}>
            New Product
          </option>
          {products?.map((x) => (
            <option value={x.id} id={`${x.name}-option`}>
              {x.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product name"
          defaultValue={productToSubmit?.name}
          suppressContentEditableWarning={true}
          contentEditable={true}
          onChange={(e) => {
            const product = productToSubmit ?? new Product();
            product.name = e.target.value;
            setProductToSubmit(product);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control
          as="select"
          className="mr-sm-2"
          id="existing-products"
          contentEditable={true}
          suppressContentEditableWarning={true}
          onChange={(e) => {
            const product = productToSubmit ?? new Product();
            product.categoryId = Number.parseInt(e.target.value);
            setProductToSubmit(product);
          }}
          custom
          defaultValue={productToSubmit?.categoryId}
        >
          {categories?.map((x) => (
            <option value={x.id} id={`${x.category}-option`}>
              {x.category}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          as={"textarea"}
          contentEditable={true}
          placeholder="Enter product description"
          defaultValue={productToSubmit?.description}
          suppressContentEditableWarning={true}
          onChange={(e) => {
            const product = productToSubmit ?? new Product();
            product.description = e.target.value;
            setProductToSubmit(product);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price per unit</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter the price"
          contentEditable={true}
          defaultValue={productToSubmit?.pricePerUnit}
          suppressContentEditableWarning={true}
          onChange={(e) => {
            const product = productToSubmit ?? new Product();
            product.pricePerUnit = Number.parseFloat(e.target.value);
            setProductToSubmit(product);
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Image Location</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter product image url"
          defaultValue={productToSubmit?.imageUrl}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onChange={(e) => {
            const product = productToSubmit ?? new Product();
            product.imageUrl = e.target.value;
            setProductToSubmit(product);
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};
