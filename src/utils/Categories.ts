import apiClient from "../services";

export const GetCategories = async () => {
  const result = await apiClient.categoriesGet();
  return result;
};
