import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import RequireAuth from "./requires/RequireAuth";

import App from "./App";
import Main from "./views/Main";
import City from "./views/City";
import Login from "./views/Login";
import SignUp from "./views/Signup";
import Cart from "./views/Cart";
import Account from "./views/Account";
import PasswordReset from "./views/PasswordReset";
import ErrorPage from "./views/ErrorPage";

import './styles/index.css';
import store from "./store/store";
import { generateData } from "./data/data";
import RequireCity from "./requires/RequireCity";
import Search from "./views/Search";
import Payment from "./views/Payment";
import RequireNotAuth from "./requires/RequireNotAuth";
import RequireHasProduct from "./requires/RequireHasProducts";
import Product from "./views/Product";

generateData();

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <RequireCity><Main /></RequireCity>
            },
            {
                path: "city",
                element: <City />
            },
            {
                path: "search",
                element: <RequireCity><Search /></RequireCity>
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "payment",
                element: <RequireHasProduct><Payment /></RequireHasProduct>
            },
            {
                path: "/product/:id",
                element: <Product />
            },
            {
                path: "login",
                element: <RequireNotAuth><Login /></RequireNotAuth>
            },
            {
                path: "signup",
                element: <RequireNotAuth><SignUp /></RequireNotAuth>
            },
            {
                path: "account",
                element: <RequireAuth><Account /></RequireAuth>
            },
            {
                path: "password-reset",
                element: <PasswordReset />
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
