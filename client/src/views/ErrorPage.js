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
    let statusCode = "";
    let statusText = "";
    let errorMessage = "unknow";
    if (error) {
        if (error.message) {
            errorMessage = error.message;
        }
        else if (error.error && error.error.message) {
            errorMessage = error.error.message;
        }

        if (error.statusText) {
            statusText = error.statusText;
        }
        else if (error.error && error.error.statusText) {
            statusText = error.error.statusText;
        }

        if (error.statusCode) {
            statusCode = error.statusCode;
        }
        else if (error.error && error.error.statusCode) {
            statusCode = error.error.statusCode;
        }

    }
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
                            <i>Status code: {statusCode}</i>
                            <br />
                            <i>Status text: {statusText}</i>
                            <br />
                            <i>Message: {errorMessage}</i>
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
