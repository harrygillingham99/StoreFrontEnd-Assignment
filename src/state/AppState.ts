import React from "react";
import firebase from "firebase/app";
import { createContainer } from "unstated-next";
import { Product } from "../services/Client";

/* 
This is a global state container for the app.
*/

const useAppState = () => {
  const [user, setUser] = React.useState<firebase.User | undefined>();
  const [showAccountModal, toggleAccountModal] = React.useState<boolean>(false);
  const [basket, updateBasket] = React.useState<number[]>([]);
  const [basketCount, setBasketCount] = React.useState<number>(0);
  const [products, setProducts] = React.useState<Product[]>([]);

  const AddItemToBasket = (itemId : number | undefined) => {
      if(itemId === undefined)
        return;

      if(basket.includes(itemId))
        return;
        
      const currentBasket = basket;
      setBasketCount(currentBasket.push(itemId));
      updateBasket(currentBasket);
  }

  const itemsInBasket = () : Product[] => {
    return products.filter(x => basket.includes(x.id ?? 0))
  }

  return {
    user,
    setUser,
    showAccountModal,
    toggleAccountModal,
    basket,
    AddItemToBasket,
    basketCount,
    products,
    setProducts,
    itemsInBasket
  };
};

export const AppContainer = createContainer(useAppState);
