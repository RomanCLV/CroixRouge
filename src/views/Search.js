import React from "react";
import "../styles/Search.css";
import {
    Container
} from "reactstrap";
import {useLoaderData} from "react-router-dom";

const Search = () => {

    const search = useLoaderData();

    return (
        <Container>
            <h2>Search</h2>
            <p>{search}</p>
        </Container>
    );
}

export default Search;
