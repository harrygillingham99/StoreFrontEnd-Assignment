import ApiClient from "./ApiClient";
import { storeApiUrl } from "../utils/Config";

const apiClient = new ApiClient({
    baseUrl: storeApiUrl,
});

export default apiClient;