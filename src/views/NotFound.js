import React from "react";
import { useRouteError } from "react-router-dom";
import {
    Container
} from "reactstrap";

import "../styles/City.css";

const NotFound = () => {
    const error = useRouteError();

    return (
        <Container>
            <h2>404 Not found</h2>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </Container>
    );
}

export default NotFound;
