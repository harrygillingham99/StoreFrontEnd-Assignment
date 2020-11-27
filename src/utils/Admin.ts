import firebase from "firebase";
import apiClient from "../services";
import { AuthedRequest } from "../services/Client";

export const IsUserAdministrator = async (user : firebase.User)  => {
    const idToken = await user.getIdToken();
    return await apiClient.adminIsAdmin(new AuthedRequest({jwtToken : idToken}))
}