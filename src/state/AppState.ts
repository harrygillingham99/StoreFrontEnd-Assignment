import React from "react";
import firebase from "firebase/app";
import { createContainer } from "unstated-next";
import { Basket, Categories, ItemAndAmount, Product } from "../services/Client";
import { GetProducts } from "../utils/Products";
import { GetCategories } from "../utils/Categories";
import { GetCurrentBasket, UpdateBasket } from "../utils/Orders";

/* 
This is a global state container for the app.
*/

const useAppState = () => {
  const [basket, updateBasket] = React.useState<Basket>(undefined!);
  const [user, setUser] = React.useState<firebase.User | undefined>();
  const [showAccountModal, toggleAccountModal] = React.useState<boolean>(false);
  const [basketCount, setBasketCount] = React.useState<number>(0);
  const [products, setProducts] = React.useState<Product[]>(undefined!);
  const [categories, setCategories] = React.useState<Categories[]>([]);
  const [isAdmin, setAdmin] = React.useState<boolean>(false);
  const [allProducts, setAllProducts] = React.useState<Product[]>([]);

  const AddItemToBasket = (
    itemId: number | undefined,
    quantity: number | undefined
  ) => {
    if (itemId === undefined) return;

    if (
      basket?.productAndQuantity?.find(
        (x) => x.itemId === itemId && x.quantity === quantity
      ) !== undefined
    )
      return;
    
    if(basket === null){
      GetBasket(user);
    }
    
    const currentBasket = basket;

    if (currentBasket.productAndQuantity === undefined || currentBasket.productAndQuantity === null) {
      currentBasket.productAndQuantity = [];
    }

    var itemAlreadyInBasket =
      basket?.productAndQuantity?.find((x) => x.itemId === itemId) ?? false
    if(itemAlreadyInBasket)
    {
    var index = basket.productAndQuantity?.indexOf(itemAlreadyInBasket);

    if (index !== undefined) {
      currentBasket.productAndQuantity[index].quantity = quantity;
      return;
    }
  }

   

    setBasketCount(
      currentBasket.productAndQuantity?.push(
        new ItemAndAmount({ itemId: itemId, quantity: quantity })
      ) ?? 0
    );

    updateBasket(currentBasket);

    setTimeout(() => UpdateBasket(user, currentBasket), 1000);
  };

  const GetBasket = (user: firebase.User | undefined) => {
    if ((basket === undefined || basket === null) && user !== undefined)
      GetCurrentBasket(user).then((res) => {
        if (res !== undefined && res !== null) {
          if (
            res.productAndQuantity === undefined ||
            res.productAndQuantity === null
          ) {
            var updatedBasket = res;
            updatedBasket.productAndQuantity = [];
            updateBasket(updatedBasket);
          }
        }
      });
  };

  const RemoveItemFromBasket = (itemToRemove: number | undefined) => {
    if (itemToRemove === undefined) return;

    const currentBasket = basket;

    currentBasket.productAndQuantity = basket.productAndQuantity?.filter(
      (x) => x.itemId !== itemToRemove
    );

    setBasketCount(currentBasket.productAndQuantity?.length ?? 0);
    updateBasket(currentBasket);
    setTimeout(() => UpdateBasket(user, currentBasket), 1000);
  };

  const getProducts = () => {
    if (products === undefined) {
      GetProducts().then((res) => {
        setProducts(res);
        setAllProducts(res);
      });
    }

    return products;
  };

  const getCategories = () => {
    if (categories === undefined || categories.length === 0) {
      GetCategories().then((res) => setCategories(res));
    }

    return categories;
  };

  const itemsInBasket = (): Product[] => {
    return getProducts().filter((x) =>
      basket.productAndQuantity?.map((x) => x.itemId).includes(x.id ?? 0)
    );
  };

  const SetUser = (user: firebase.User | undefined) => {
    if ((basket === undefined || basket === null) && user !== undefined)
      GetCurrentBasket(user).then((res) => {
        if (res !== undefined) updateBasket(res);
      });
    setUser(user);
  };

  const ClearBasket = () => {
    updateBasket(new Basket());
    setBasketCount(0);
  };

  return {
    user,
    SetUser,
    showAccountModal,
    toggleAccountModal,
    basket,
    AddItemToBasket,
    basketCount,
    getProducts,
    setProducts,
    itemsInBasket,
    getCategories,
    setCategories,
    isAdmin,
    setAdmin,
    allProducts,
    products,
    RemoveItemFromBasket,
    GetBasket,
    ClearBasket,
  };
};

export const AppContainer = createContainer(useAppState);
