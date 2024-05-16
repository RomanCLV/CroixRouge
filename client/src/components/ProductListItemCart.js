import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import {
    Button,
    Card,
    Col,
    Row
} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import {ROUTES} from "../router/routes";
import VestingState from "./VestingState";
//import { getProductById } from "../services/productsService";
import {useDispatch} from "react-redux";
import {deleteProduct} from "../store/slices/productsSlice";
import {clearToast, setToast} from "../store/slices/toastSlice";
import {getPriceToDisplay} from "./CartTicket";

const ProductListItemCart = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const product = props.product;
    console.log("product cart:", product)
    const image = product.images.length > 0 ? product.images[0] : "";
    let canDelete = true;
    if (props.canDelete === true || props.canDelete === false) {
        canDelete = props.canDelete;
    }

    // eslint-disable-next-line
    const [city, setCity] = useState(null);

    const onNavigate = () => {
        navigate(ROUTES.product + "/" + product.id)
    }

    const deleteItem = () => {
        if (canDelete) {
            dispatch(deleteProduct(product));
            dispatchToast("Produit retiré", "Ce produit a été retiré de votre panier.", "success",5000);
        }
    }

    const dispatchToast = (title, message, type, timeout) => {
        dispatch(setToast({
            title: title,
            message: message,
            type: type
        }));
        setTimeout(() => {
            dispatch(clearToast());
        }, timeout);
    }

    return city ? 
        <div className={"item-cart-container"}><p>Ce produit n'existe pas.</p></div> :
        (
        <div className={"item-cart-container"}>
            <Col xs={12} sm={3} onClick={onNavigate} className={"cursor-pointer"}>
                <Card>
                    <img src={image} alt={"product"} />
                </Card>
            </Col>
            <Col xs={12} sm={9} className={"item-cart-description-container"}>
                <Row className={"item-cart-description-container-1"}>
                    <h4 onClick={onNavigate} className={"cursor-pointer"}>{product.name}</h4>
                    <VestingState vestingState={product.vestingState} />
                    <div className={"d-flex align-items-center margin-top-20px"}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <p className={"margin-auto"}>{city.name}</p>
                    </div>
                    <p className={"margin-auto margin-top-20px"}>Taille : {product.size}</p>
                </Row>
                <Row className={"item-cart-description-container-2"}>
                    <p>{getPriceToDisplay(product.price)} €</p>
                    {
                        canDelete &&
                            <Button
                                className={"cart-trash-button"}
                                color="transparent"
                                onClick={deleteItem}>
                                <FontAwesomeIcon icon={faTrashCan} />
                            </Button>
                    }
                </Row>
            </Col>
        </div>
    );
}

export default ProductListItemCart;
