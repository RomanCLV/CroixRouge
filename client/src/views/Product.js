import React, { useCallback, useEffect, useState } from "react";
import "../styles/Product.css";
import {
    Button,
    Container,
    Col,
    Row
} from "reactstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct, hasProducts } from "../store/slices/productsSlice";
import { clearToast, setToast } from "../store/slices/toastSlice";
import ProductImages from "../components/ProductImages";
import VestingState from "../components/VestingState";
// import ProductsList from "../components/ProductsList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { getProductById } from "../services/productsService";
import { getPriceToDisplay } from "../components/CartTicket";

const Product = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const productID = useLoaderData();

    const [hasProduct, setHasProduct] = useState(useSelector(hasProducts));
    const [product, setProduct] = useState(null);

    const fetchProduct = useCallback(async () => {
        const result = await getProductById(productID);
        if (result.error || !result.product) {
            setProduct(null);
        }
        else {
            setProduct(result.product);
        }
    }, [productID])

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    const onAddProductClick = () => {
        if (!hasProduct) {
            dispatch(addProduct(product));
            dispatchToast("Produit ajouté", "Ce produit a été ajouté à votre panier.", "success", 5000);
            setHasProduct(true);
        }
        else {
            dispatchToast("Produit non ajouté", "Ce produit est déjà dans votre panier.", "warning", 5000);
        }
    }

    const onRemoveProductClick = () => {
        if (hasProduct) {
            dispatch(deleteProduct(product));
            dispatchToast("Produit retiré", "Ce produit a été retiré de votre panier.", "success", 5000);
            setHasProduct(false);
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

    // const similarProducts = searchProducts(currentProduct.cityId, {
    //     categories: [currentProduct.category],
    // });

    return product ?
        <Container className={"mainContentView"}>
            <Row>
                <Col>
                    <Button onClick={() => navigate(-1)} color={"transparent"}>
                        <FontAwesomeIcon icon={faArrowLeft} color={"gray"} />
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col xs={12} sm={8} >
                    <div className={"productImagesContainer"}>
                        <ProductImages images={product.images} />
                    </div>
                </Col>
                <Col xs={12} sm={4}>
                    <Row>
                        <div className={"productNamePriceContainer"}>
                            <h3 className={"productNamePriceContainerItem"}>{product.title}</h3>
                            <p className={"productNamePriceContainerItem price-text"}>{getPriceToDisplay(product.price)} €</p>
                        </div>
                    </Row>
                    <Row className={"margin-top-20px"}>
                        <Col>
                            <p>{product.category} {product.gender}</p>
                            <p>Taille : {product.size.toUpperCase()}</p>
                        </Col>
                        <Col className={"d-flex justify-content-end"}>
                            <VestingState state={product.state} />
                        </Col>
                    </Row>
                    <Row>
                        <p>{product.description}</p>
                    </Row>
                    <Row>
                        <div className={"d-flex justify-content-start align-items-center"}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <p className={"margin-auto-0 margin-left-20px"}>{product.city}</p>
                        </div>
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
                                    className={"border-0 fw-semibold"}
                                >
                                    Supprimer du panier
                                </Button>
                                :
                                <Button
                                    onClick={onAddProductClick}
                                    className={"bg-primary-red border-0 fw-semibold"}
                                    disabled={hasProduct}
                                >
                                    Ajouter au panier
                                </Button>
                        }
                    </Row>
                </Col>
            </Row>
            <Container>
                {/* <ProductsList
                    category="Produits similaires"
                    products={similarProducts.map(id => getProductById(id))}
                    seeMore={ROUTES.search + "/categories=" + currentProduct.category}
                /> */}
            </Container>
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
