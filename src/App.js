import React from "react";
import { Outlet } from "react-router-dom";
import {
    Container
} from "reactstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";
import './styles/App.css';

function App() {

    return (
        <Container className="App">
            <Header />
            <Outlet />
            <Footer />
        </Container>
    );
}

export default App;
