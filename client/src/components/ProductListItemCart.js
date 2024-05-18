import React, { useCallback, useEffect, useState } from "react";
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
import { getProductById } from "../services/productsService";
import {useDispatch} from "react-redux";
import {deleteProduct, deleteProductIndex} from "../store/slices/productsSlice";
import {clearToast, setToast} from "../store/slices/toastSlice";
import {getPriceToDisplay} from "./CartTicket";
import { deleteCart } from "../services/cartsService";

const ProductListItemCart = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const productId = props.productId;
    
    let canDelete = true;
    if (props.canDelete === true || props.canDelete === false) {
        canDelete = props.canDelete;
    }
    const [product, setProduct] = useState(props.product || null);
    const [image, setImage] = useState(props.product && props.product.images.length > 0 ? props.product.images[0] : "");

    const fetchProduct = useCallback(async () => {
        const result = await getProductById(productId);
        if (result.error || !result.product) {
            setProduct(null);
            setImage("");
        }
        else {
            setProduct(result.product)
            setImage(result.product.images.length > 0 ? result.product.images[0] : "");
        }
    }, [productId])

    useEffect(() => {
        if (!product && productId) {
            fetchProduct();
        }
    }, [product, productId, fetchProduct])

    const onNavigate = () => {
        navigate(ROUTES.product + "/" + product.id)
    }

    const deleteItem = async () => {
        if (canDelete) {
            const currentJWT = localStorage.getItem("jwt");
            if (currentJWT) {
                const result = await deleteCart(currentJWT, product ? product.id : null);
                if (result.value) {
                    if (product) {
                        dispatch(deleteProduct(product));
                    }
                    else {
                        dispatch(deleteProductIndex(props.index));
                    }
                    dispatchToast("Produit retiré", "Ce produit a été retiré de votre panier.", "success", 5000);
                }
                else {
                    if (!product) {
                        dispatch(deleteProduct(product));
                        dispatchToast("Produit retiré", "Ce produit a été retiré de votre panier.", "success", 5000);
                    }
                    else {
                        dispatchToast("Produit non retiré", "Ce produit n'est pas dans votre panier.", "warning", 5000);
                    }
                }
            }
            else {
                if (product) {
                    dispatch(deleteProduct(product));
                }
                else {
                    dispatch(deleteProductIndex(props.key));
                }
                dispatchToast("Produit retiré", "Ce produit a été retiré de votre panier.", "success", 5000);
            }
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

    return (
        <div className={"item-cart-container"}>
            <Col xs={12} sm={3} onClick={onNavigate} className={"cursor-pointer"}>
                <Card>
                    <img src={product ? image : "http://www.image-heberg.fr/files/17160391993863747883.png"} alt={"product"} />
                </Card>
            </Col>
            <Col xs={12} sm={9} className={"item-cart-description-container"}>
                <Row className={"item-cart-description-container-1"}>
                    <h4 onClick={onNavigate} className={"cursor-pointer"}>{product ? product.title : "Produit supprimé"}</h4>
                    { product ?
                        <>
                        <VestingState vestingState={product.vestingState} />
                        <div className={"d-flex align-items-center margin-top-20px"}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <p className={"margin-auto"}>{product.city}</p>
                        </div>
                        <p className={"margin-auto margin-top-20px"}>Taille : {product.size}</p>
                        </>
                        : 
                        <p>Ce produit a déjà été acheté.</p>
                    }
                </Row>
                <Row className={"item-cart-description-container-2"}>
                    { product && <p>{getPriceToDisplay(product.price)} €</p>}
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
