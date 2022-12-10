import React, {useEffect, useState} from "react";
import "../styles/Product.css";
import {
    Button,
    Col,
    Container, Row
} from "reactstrap";
import {useLoaderData} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, deleteProduct, selectProducts} from "../store/slices/productsSlice";
import {clearToast, setToast} from "../store/slices/toastSlice";
import ProductImages from "../components/ProductImages";
import VestingState from "../components/VestingState";

const Product = () => {

    const dispatch = useDispatch();
    const currentProduct = useLoaderData();
    const products = useSelector(selectProducts);

    const [hasProduct, setHasProduct] = useState(false);

    useEffect(() => {
        if (!currentProduct) {
            return;
        }
        const match = products.find(product => product.id === currentProduct.id);
        if (match) {
            if (!hasProduct) {
                setHasProduct(true);
            }
        }
        else {
            if (hasProduct) {
                setHasProduct(false);
            }
        }
    }, [products, currentProduct, hasProduct]);

    const onAddProductClick = () => {
        if (!hasProduct) {
            dispatch(addProduct(currentProduct));
            dispatchToast("Produit ajouté", "Ce produit a été ajouté à votre panier.", "success", 5000);
        }
        else {
            dispatchToast("Produit non ajouté", "Ce produit est déjà dans votre panier.", "warning", 5000);
        }
    }

    const onRemoveProductClick = () => {
        if (hasProduct) {
            dispatch(deleteProduct(currentProduct));
            dispatchToast("Produit retiré", "Ce produit a été retiré de votre panier.", "success",5000);
        }
        else {
            dispatchToast("Produit non retiré", "Ce produit n'est pas dans votre panier.", "warning", 5000);
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

    return currentProduct ?
        <Container className={"mainContentView"}>
            <Row>
                <Col xs={12} sm={8} >
                    <div className={"productImagesContainer"}>
                        <ProductImages images={currentProduct.images} />
                    </div>
                </Col>
                <Col xs={12} sm={4}>
                    <Row>
                        <div className={"productNamePriceContainer"}>
                            <h3 className={"productNamePriceContainerItem"}>{currentProduct.name}</h3>
                            <p  className={"productNamePriceContainerItem"}>{currentProduct.price}€</p>
                        </div>
                    </Row>
                    <Row className={"margin-top-20px"}>
                        <Col>
                            <p>{currentProduct.category} {currentProduct.gender}</p>
                            <p>Taille : {currentProduct.size.toUpperCase()}</p>
                        </Col>
                        <Col className={"d-flex justify-content-end"}>
                            <VestingState vestingState={currentProduct.vestingState} />
                        </Col>
                    </Row>
                    <Row>
                        <p>{currentProduct.description}</p>
                    </Row>
                    {
                        hasProduct && <p className={"margin-top-20px"}>Cet article est dans votre panier.</p>
                    }
                    <Row xs={"2"} className={"justify-content-center margin-top-10vh"}>
                        {
                            hasProduct ?
                                <Button
                                    onClick={onRemoveProductClick}
                                    color={"danger"}
                                    disabled={!hasProduct}
                                >
                                    Supprimer du panier
                                </Button>
                                :
                                <Button
                                    onClick={onAddProductClick}
                                    className={"bg-primary-red border-0 text-uppercase fw-semibold"}
                                    disabled={hasProduct}
                                >
                                    Ajouter au panier
                                </Button>
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
        :
        <Container className={"mainContentView"}>
            <Row>
                <Col>
                    <p>Ce produit n'existe pas.</p>
                </Col>
            </Row>
        </Container>
}

export default Product;
