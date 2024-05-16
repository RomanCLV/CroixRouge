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

import App from "./App";
import Main from "./views/Main";
import Cities from "./views/Cities";
//import SelectedCity from "./views/SelectedCity";
import Search from "./views/Search";
import Product from "./views/Product";
import Cart from "./views/Cart";
import Payment from "./views/Payment";
import PaymentDone from "./views/PaymentDone";
import Login from "./views/Login";
import SignUp from "./views/Signup";
import Account from "./views/Account";
import PasswordReset from "./views/PasswordReset";
import ErrorPage from "./views/ErrorPage";
import AddProduct from './views/AddProduct';

// import { generateData } from "./data/data";
//import { citiesLoader } from "./router/loaders/citiesLoader";
//import { selectedCityLoader } from "./router/loaders/selectedCityLoader";
import { searchLoader } from "./router/loaders/searchLoader";
// import { productLoader } from "./router/loaders/productLoader";
import RequireHasProducts from "./router/requires/RequireHasProducts";

import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddCity from './views/AddCity';

// useful links:
// Repo Git    : https://github.com/Estia-1a/sgv_etu_2022-theambersunflower
// Reactstrap  : https://reactstrap.github.io/?path=/story/home-installation--page
// fontawesome : https://fontawesome.com/v5/docs/web/use-with/react
// reactrouter : https://reactrouter.com/en/main/start/tutorial
// react-redux : https://react-redux.js.org/tutorials/quick-start
// map         : https://www.npmjs.com/package/google-map-react
// map         : https://github.com/giorgiabosello/google-maps-react-markers

// generateData();

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
                //loader: citiesLoader
            },
            // {
            //     path: ROUTES.city + "/:id",
            //     element: <SelectedCity />,
            //     loader: selectedCityLoader
            // },
            {
                path: ROUTES.search,
                element: <RequireCity><Search /></RequireCity>,
                loader: searchLoader,
            },
            {
                path: ROUTES.search + "/:search",
                element: <RequireCity><Search /></RequireCity>,
                loader: searchLoader
            },
            {
                path: ROUTES.product + "/:id",
                element: <Product />,
                // loader: productLoader
            },
            {
                path: ROUTES.cart,
                element: <Cart />
            },
            {
                path: ROUTES.payment,
                element: <RequireAuth><RequireHasProducts><Payment /></RequireHasProducts></RequireAuth>
            },
            {
                path: ROUTES.paymentDone,
                element: <RequireAuth><PaymentDone /></RequireAuth>
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
            },
            {
                path: ROUTES.addProduct,
                element: <RequireAuth><RequireCity><AddProduct /></RequireCity></RequireAuth>
            },
            {
                path: ROUTES.addCity,
                element: <RequireAuth><AddCity /></RequireAuth>
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
