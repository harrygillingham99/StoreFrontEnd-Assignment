import firebase from "firebase";
import apiClient from "../services";
import {
  AuthedBasketRequestWrapper,
  AuthedRequest,
  Basket,
} from "../services/Client";

export const GetHistoricOrders = async (user: firebase.User | undefined) => {
  if (user === undefined) return;

  var token = await user.getIdToken();
  var result = await apiClient.sessionHistoricOrders(
    new AuthedRequest({ jwtToken: token })
  );
  return result;
};

export const PlaceOrder = async (
  user: firebase.User | undefined,
  basketToOrder: Basket
) => {
  if (user === undefined) return;

  var token = await user.getIdToken();
  var result = await apiClient.sessionPlaceOrder(
    new AuthedBasketRequestWrapper({
      token: new AuthedRequest({jwtToken: token}),
      basket: new Basket(basketToOrder),
    })
  );
  return result;
};

export const UpdateBasket = async (user: firebase.User | undefined, basketToUpdate : Basket) => {
  if (user === undefined) return;

  var token = await user.getIdToken();
  console.log(basketToUpdate);
  var result = await apiClient.sessionUpdateBasket(
    new AuthedBasketRequestWrapper({
      token: new AuthedRequest({jwtToken: token}),
      basket: new Basket(basketToUpdate),
    })
  );
  return result;
};

export const GetCurrentBasket = async (user: firebase.User | undefined) => {
  if (user === undefined || user === null) return;

  var token = await user.getIdToken();
  var result = await apiClient.sessionCurrentBasket(
    new AuthedRequest({ jwtToken: token })
  );
  return result;
};
