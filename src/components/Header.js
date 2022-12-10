import React from "react";
import "../styles/Header.css";
import {
    Badge,
    Container
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBagShopping, faLocationDot } from "@fortawesome/free-solid-svg-icons";

import {useNavigate} from "react-router-dom";
import {ROUTES} from "../router/routes";
import Logo from "./Logo";
import {useSelector} from "react-redux";
import {isConnected, selectUser} from "../store/slices/userSlice";
import {selectProducts} from "../store/slices/productsSlice";
import {selectCity} from "../store/slices/citySlice";

const Header = () => {

    const navigate = useNavigate();

    const isConnect = useSelector(isConnected);
    const user = useSelector(selectUser);
    const products = useSelector(selectProducts);
    const city = useSelector(selectCity);

    const onLocationButtonClick = () => {
        navigate(ROUTES.cities);
    }

    const onUserButtonClick = () => {
        navigate(isConnect ? ROUTES.account : ROUTES.login);
    }

    const onCartButtonClick = () => {
        navigate(ROUTES.cart);
    }

    return (
        <div id={"Header"}>
            <Container className={"headerDiv1"}>
                <div>
                    <Logo />
                </div>

                <div id={"header-icons-div"}>
                    {
                        city && <p>{city.name}</p>
                    }
                    <FontAwesomeIcon
                        className={"header-icon"}
                        icon={faLocationDot}
                        title={"Sélectionner une ville"}
                        size={"lg"}
                        onClick={onLocationButtonClick}
                    />
                    {
                        isConnect && <p>{user.username}</p>
                    }
                    <FontAwesomeIcon
                        className={"header-icon"}
                        title={isConnect ? "Mon compte" : "Se connecter"}
                        icon={faUser}
                        size={"lg"}
                        onClick={onUserButtonClick}
                    />
                    <FontAwesomeIcon
                        className={"header-icon"}
                        icon={faBagShopping}
                        title={"Panier"}
                        size={"lg"}
                        onClick={onCartButtonClick}
                    />
                    {
                        products.length > 0 && <Badge
                            className={"badge"}
                            color={"primary"}
                            pill>
                            {products.length}
                        </Badge>
                    }
                </div>
            </Container>
        </div>
    );
}

export default Header;
