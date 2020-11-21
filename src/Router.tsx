import React from "react";
import Switch from "react-bootstrap/esm/Switch";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { AccountModal } from "./components/AccountModal";
import { AppAlert } from "./components/AppAlert";
import NavigationBar from "./components/NavigationBar";
import { ProductContainer } from "./components/ProductContainer";
import apiClient from "./services";
import { StoreItem } from "./services/Client";
import { AppAlertContainer } from "./state/AppAlertState";
import { AppContainer } from "./state/AppState";
import { SearchContainer } from "./state/SearchState";
import { Routes } from "./types/Routes";


export const Router = () => {
  const {user} = AppContainer.useContainer();
  const [products, setProducts] = React.useState<StoreItem[]>();
  const {ToggleAlert} = AppAlertContainer.useContainer();

  React.useEffect(() => {
    const fetchProducts = async () => {
    try{const result = await apiClient.productsGet();
        setProducts(result);}
    catch(ex) {
        ToggleAlert(true, "danger", "Error!", "Failed to fetch the latest products")
    }
    };
    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <SearchContainer.Provider>
        <NavigationBar />
        <AppAlert />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path={Routes.Home}>
            <ProductContainer products={products} />
          </Route>
          <Route path={Routes.Account}>
            <div className="App">
              <header className="App-header">
                <p>We be routing</p>
              </header>
            </div>
          </Route>
        </Switch>
        <AccountModal />
      </SearchContainer.Provider>
    </BrowserRouter>
  );
};
