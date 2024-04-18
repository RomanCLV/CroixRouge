import React from "react";
import { useRouteError } from "react-router-dom";
import {
    Alert,
    Container,
    Row
} from "reactstrap";

import "../styles/ErrorPage.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div>
            <Header />
            <div className={"redFilledRectangle"} />
            <Container className={"margin-top-10vh margin-bottom-10vh"}>
                <Row>
                    <h1>Oops!</h1>
                </Row>
                <Row>
                    <p>Sorry, an unexpected error has occurred.</p>
                    <Alert color="danger">
                        <p>
                            <i>{error.statusText}</i>
                            <br />
                            <i>{error.error.message}</i>
                        </p>
                    </Alert>
                </Row>
                <Row className={"margin-top-10vh margin-bottom-10vh"}>
                    <div className={"d-flex justify-content-center"}>
                        <img className={"error-image"} src={"./assets/images/pierre.png"} alt={"error_pic"}/>
                    </div>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default ErrorPage;
