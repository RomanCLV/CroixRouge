import React from "react";
import {Container} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../router/routes";

const Logo = () => {

    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate(ROUTES.root);
    };

    return (
        <Container id={"logo"} onClick={onClickHandler}>
            <img id={"logo-img"} src={"./logo192.png"} alt={"logo_img"} />
            <h1 className={"test"}>Croix Rouge</h1>
        </Container>
    );
}

export default Logo;