import React, { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
    Toast, ToastBody, ToastHeader
} from "reactstrap";
import {useSelector, useDispatch} from "react-redux";

import Header from "./components/Header";
import Footer from "./components/Footer";
import './styles/App.css';
import {status} from "./services/authService"
import {selectToast} from "./store/slices/toastSlice";
import {isConnected, setUser} from "./store/slices/userSlice";
import {clearToast, setToast} from "./store/slices/toastSlice";
import { getCarts } from "./services/cartsService";
import { addProduct } from "./store/slices/productsSlice";

function App() {
    const dispatch = useDispatch();
    const toast = useSelector(selectToast);
    const userIsConnected = useSelector(isConnected);

    const successAuth = useCallback((user) => {
        dispatch(setUser(user));
        dispatch(setToast({
            type: "success",
            title: "Connexion réussie",
            message: "Heureux de vous revoir " + user.username + " !"
        }));
        setTimeout(() => {
            dispatch(clearToast());
        }, 3000);
    }, [dispatch]);

    useEffect(() => {
        if (!userIsConnected) {
            const currentJWT = localStorage.getItem('jwt');
            if (currentJWT) {
                const fetchStatus = async () => {
                    const result = await status(currentJWT);
                    if (result.error) {
                        localStorage.removeItem("jwt");
                    }
                    else {
                        localStorage.setItem("jwt", result.jwt);
                        const cart = await getCarts(result.jwt);
                        if (cart.products) {
                            cart.products.forEach(product => dispatch(addProduct(product)))
                        }
                        successAuth(result.user);
                    }
                };
                fetchStatus();
            }
        }
    }, [userIsConnected, successAuth]);

    return (
        <div>
            {
                toast.message &&
                    <div className={"p-3 my-2 rounded fixed-bottom"}>
                        <Toast>
                            <ToastHeader icon={toast.type}>
                                {toast.title}
                            </ToastHeader>
                            <ToastBody>
                                {toast.message}
                            </ToastBody>
                        </Toast>
                    </div>
            }

            <Header />
            <div className={"redFilledRectangle"} />
            <div className="App">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default App;
