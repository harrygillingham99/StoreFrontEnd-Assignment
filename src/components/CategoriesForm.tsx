import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Categories } from "../services/Client";
import { AppAlertContainer } from "../state/AppAlertState";
import { AppContainer } from "../state/AppState";
import {
  InsertCategory,
  UpdateCategory,
} from "../utils/Categories";

export const CategoriesForm = () => {
  const { getCategories } = AppContainer.useContainer();
  const [categoryToSubmit, setCategory] = React.useState<Categories>();
  const [newItem, setNewItem] = React.useState<boolean>(true);
  const { ToggleAlert } = AppAlertContainer.useContainer();

  const categoriesList = getCategories();

  const handleSubmit = () => {
    if (categoriesList === undefined || categoryToSubmit === undefined) {
      return;
    }
    if (newItem) {
      categoryToSubmit.id =
        categoriesList.reduce((a, b) => ((a.id ?? 0) > (b.id ?? 0) ? a : b))
          .id ?? 0 + 1;
      InsertCategory(categoryToSubmit).then((res) =>
        ToggleAlert(
          true,
          res ? "success" : "danger",
          res ? "Success!" : "Error!",
          `${res ? "Success creating" : "Failed to create"} new product.`
        )
      );
    } else {
      UpdateCategory(categoryToSubmit).then((res) =>
        ToggleAlert(
          true,
          res ? "success" : "danger",
          res ? "Success!" : "Error!",
          `${res ? "Success updating" : "Failed to update"} the product.`
        )
      );
    }
  };

  const handleSelectedProductChange = (id: string) => {
    if (id === "no-option") {
      setNewItem(true);
      setCategory(new Categories());
      return;
    }
    var selectedProduct =
      categoriesList.find((x) => x.id === Number.parseInt(id)) ??
      categoriesList[0];
    setNewItem(false);
    setCategory(selectedProduct);
  };
  return (
    <Container className="pt-2">
      <Form.Group>
        <Form.Label>Update existing category?</Form.Label>
        <Form.Control
          as="select"
          className="mr-sm-2"
          id="existing-products"
          onChange={(id) => handleSelectedProductChange(id.target.value)}
          custom
        >
          <option value={"no-option"} id={"no-option"}>
            New Category
          </option>
          {categoriesList?.map((x) => (
            <option value={x.id} key={`${x.category}-option`}>
              {x.category}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Product Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter category name"
          defaultValue={categoryToSubmit?.category}
          suppressContentEditableWarning={true}
          contentEditable={true}
          onChange={(e) => {
            const category = categoryToSubmit ?? new Categories();
            category.category = e.target.value;
            setCategory(category);
          }}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};
