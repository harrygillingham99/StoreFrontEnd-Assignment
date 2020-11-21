import apiClient from "../services"
import { StoreItem } from "../services/Client";


export const GetProducts = async () : Promise<StoreItem[] | false> => {
    const response = await apiClient.productsGet();
    return response !== undefined ? response : false
}