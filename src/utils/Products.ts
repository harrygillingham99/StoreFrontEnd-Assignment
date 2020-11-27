import apiClient from "../services";
import { Product } from "../services/Client";

export const GetProducts = async (): Promise<Product[]> => {
  const response = await apiClient.productsGet();
  return response;
};
