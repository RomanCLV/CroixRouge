import React from "react";
import "../styles/Main.css";
import {
    Container
} from "reactstrap";
import SearchBar from "../components/SearchBar";

const Main = () => {

    return (
        <Container>
            <h2>Main</h2>
            <SearchBar />
        </Container>
    );
}

export default Main;
