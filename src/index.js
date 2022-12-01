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
import SignIn from "./views/Signin";
import Cart from "./views/Cart";
import Account from "./views/Account";
import PasswordReset from "./views/PasswordReset";
import NotFound from "./views/NotFound";

import './styles/index.css';
import store from "./store/store";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                index: true,
                element: <Main />
            },
            {
                path: "city",
                element: <City />
            },
            {
                path: "cart",
                element: <Cart />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "signin",
                element: <SignIn />
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
