import React from "react"
import { Redirect } from "react-router-dom";
import { AppContainer } from "../state/AppState"
import { Routes } from "../types/Routes";

export const AdminRoute = () => {
    const {isAdmin} = AppContainer.useContainer();

    if(!isAdmin) return <Redirect to={Routes.FourOhOne} />
    
    return <p>Admin mode</p>
}