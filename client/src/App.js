import React from "react";
import { Outlet } from "react-router-dom";
import {
    Toast, ToastBody, ToastHeader
} from "reactstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";
import './styles/App.css';
import {useSelector} from "react-redux";
import {selectToast} from "./store/slices/toastSlice";

function App() {

    const toast = useSelector(selectToast);

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
