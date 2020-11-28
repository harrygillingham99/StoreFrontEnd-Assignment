import apiClient from "../services";
import { Product } from "../services/Client";

export const GetProducts = async (): Promise<Product[]> => {
  const response = await apiClient.productsGet();
  return response;
};

export const UpdateProduct = async (product : Product): Promise<boolean> => {
  const response = await apiClient.productsPut(product);
  return response;
};

export const InsertProduct = async (product : Product): Promise<boolean> => {
  const response = await apiClient.productsPost(product);
  return response;
};
