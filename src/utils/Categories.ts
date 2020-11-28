import apiClient from "../services";
import { Categories } from "../services/Client";

export const GetCategories = async () => {
  const result = await apiClient.categoriesGet();
  return result;
};

export const InsertCategory = async (category : Categories) => {
  const result = await apiClient.categoriesPost(category);
  return result;
};

export const UpdateCategory = async (category : Categories) => {
  const result = await apiClient.categoriesPut(category);
  return result;
};
