import firebase from "firebase";
import apiClient from "../services";
import { AuthedRequest } from "../services/Client";

export const GetHistoricOrders = async (user: firebase.User | undefined) => {
  if (user === undefined) return;

  var token = await user.getIdToken();
  var result = await apiClient.sessionHistoricOrders(
    new AuthedRequest({ jwtToken: token })
  );
  return result;
};
