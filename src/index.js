import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import store from "./store/store";
import { ROUTES } from "./router/routes";

import RequireAuth from "./router/requires/RequireAuth";
import RequireCity from "./router/requires/RequireCity";
import RequireNotAuth from "./router/requires/RequireNotAuth";
import RequireHasProduct from "./router/requires/RequireHasProducts";

import App from "./App";
import Main from "./views/Main";
import Cities from "./views/Cities";
import SelectedCity from "./views/SelectedCity";
import Search from "./views/Search";
import Product from "./views/Product";
import Cart from "./views/Cart";
import Payment from "./views/Payment";
import Login from "./views/Login";
import SignUp from "./views/Signup";
import Account from "./views/Account";
import PasswordReset from "./views/PasswordReset";
import ErrorPage from "./views/ErrorPage";

import './styles/index.css';
import { generateData } from "./data/data";
import { citiesLoader } from "./router/loaders/citiesLoader";
import { selectedCityLoader } from "./router/loaders/selectedCityLoader";

generateData();

const router = createBrowserRouter([
    {
        path: ROUTES.root,
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <RequireCity><Main /></RequireCity>
            },
            {
                path: ROUTES.cities,
                element: <Cities />,
                loader: citiesLoader
            },
            {
                path: ROUTES.city + "/:id",
                element: <SelectedCity />,
                loader: selectedCityLoader
            },
            {
                path: ROUTES.search,
                element: <RequireCity><Search /></RequireCity>
            },
            {
                path: ROUTES.product + "/:id",
                element: <Product />
            },
            {
                path: ROUTES.cart,
                element: <Cart />
            },
            {
                path: ROUTES.payment,
                element: <RequireHasProduct><Payment /></RequireHasProduct>
            },
            {
                path: ROUTES.login,
                element: <RequireNotAuth><Login /></RequireNotAuth>
            },
            {
                path: ROUTES.signup,
                element: <RequireNotAuth><SignUp /></RequireNotAuth>
            },
            {
                path: ROUTES.passwordReset,
                element: <PasswordReset />
            },
            {
                path: ROUTES.account,
                element: <RequireAuth><Account /></RequireAuth>
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
