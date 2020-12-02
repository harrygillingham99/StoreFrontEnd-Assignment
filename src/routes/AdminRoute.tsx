import React from "react";
import {
  Container,
  Jumbotron,
  Tab,
  Tabs,
} from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { CategoriesForm } from "../components/CategoriesForm";
import { ProductForm } from "../components/ProductForm";
import { AppContainer } from "../state/AppState";
import { Routes } from "../types/Routes";

enum AdminTabs {
  Products = "Products",
  Categories = "Categories",
  Utilities = "Utilities",
  Orders = "Orders",
}

export const AdminRoute = () => {
  const { isAdmin } = AppContainer.useContainer();
  const [tabKey, setTab] = React.useState<string>(
    AdminTabs.Products.toString()
  );

  if (isAdmin !== undefined && !isAdmin)
    return <Redirect to={Routes.FourOhOne} />;

  return (
    <>
      <Jumbotron fluid>
        <Container>
          <h1>Site Admin</h1>
          <p>You can edit products here and adjust site settings.</p>
        </Container>
      </Jumbotron>
      <Tabs
        activeKey={tabKey}
        onSelect={(key) => setTab(key ?? AdminTabs.Products)}
      >
        <Tab eventKey={AdminTabs.Products} title={AdminTabs.Products}>
          <ProductForm />
        </Tab>
        <Tab eventKey={AdminTabs.Categories} title={AdminTabs.Categories}>
            <CategoriesForm />
        </Tab>
      </Tabs>
    </>
  );
};
