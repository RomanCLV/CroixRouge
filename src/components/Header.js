import React from "react";
import "../styles/Header.css";
import {
    Button,
    ButtonGroup,
    Container
} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../router/routes";

const Header = () => {

    const navigate = useNavigate();

    const onHomeButtonClick = () => {
        navigate(ROUTES.root);
    };

    const onAccountButtonClick = () => {
        navigate(ROUTES.account);
    };

    const onLoginButtonClick = () => {
        navigate(ROUTES.login);
    };

    const onCartButtonClick = () => {
        navigate(ROUTES.cart);
    };

    return (
        <Container>
            <h2>Header</h2>
            <ButtonGroup>
                <Button onClick={onHomeButtonClick}>
                    CroixRouge
                </Button>
                <Button onClick={onAccountButtonClick}>
                    Account
                </Button>
                <Button onClick={onLoginButtonClick}>
                    Se connecter
                </Button>
                <Button onClick={onCartButtonClick}>
                    Panier
                </Button>
            </ButtonGroup>
        </Container>
    );
}

export default Header;
