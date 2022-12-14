import React, {useEffect, useState} from "react";
import "../styles/Product.css";
import {
    Button,
    Container,
    Col,
    Row
} from "reactstrap";
import {useLoaderData, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addProduct, deleteProduct, selectProducts} from "../store/slices/productsSlice";
import {clearToast, setToast} from "../store/slices/toastSlice";
import ProductImages from "../components/ProductImages";
import VestingState from "../components/VestingState";
import ProductsList from "../components/ProductsList";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import {getCityById, getProductById, searchProducts} from "../data/data";
import {ROUTES} from "../router/routes";
import {getPriceToDisplay} from "../components/CartTicket";

const Product = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const currentProduct = useLoaderData();
    const products = useSelector(selectProducts);
    const city = getCityById(currentProduct.cityId);

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

    const similarProducts = searchProducts(currentProduct.cityId,{
        categories: [currentProduct.category],
    });

    return currentProduct ?
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
                        <ProductImages images={currentProduct.images} />
                    </div>
                </Col>
                <Col xs={12} sm={4}>
                    <Row>
                        <div className={"productNamePriceContainer"}>
                            <h3 className={"productNamePriceContainerItem"}>{currentProduct.name}</h3>
                            <p className={"productNamePriceContainerItem price-text"}>{getPriceToDisplay(currentProduct.price)} €</p>
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
                    <Row>
                        <div className={"d-flex justify-content-start align-items-center"}>
                            <FontAwesomeIcon icon={faLocationDot} />
                            <p className={"margin-auto-0 margin-left-20px"}>{city.name}</p>
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
                <ProductsList
                    category="Produits similaires"
                    products={similarProducts.map(id=>getProductById(id))}
                    seeMore={ROUTES.search + "/categories=" + currentProduct.category}
                />
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
