import React, {useEffect, useState} from "react";
import "../styles/Cart.css";
import {
    Button,
    Container,
    Row,
    Col, ModalHeader, ModalBody, ModalFooter, Modal,
} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import CartStatement from "../components/CartStatement";
import ProductListItemCart from "../components/ProductListItemCart";
import CartTicket from "../components/CartTicket";
import {clearProducts, hasProducts, selectProducts} from "../store/slices/productsSlice";
import {clearToast, setToast} from "../store/slices/toastSlice";

import {ROUTES} from "../router/routes";

const Cart = () => {

    const navigate = useNavigate();
    const products = useSelector(selectProducts);
    const canPay = useSelector(hasProducts);
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);
    const [canClearProducts, setCanClearProducts] = useState(products.length !== 0);

    useEffect(() => {
        const canClear = products.length !== 0;
        if (canClear !== canClearProducts) {
            setCanClearProducts(canClear);
        }
    },[products.length, canClearProducts]);

    const onCommanderClick = () => {
        if (canPay) {
            navigate(ROUTES.payment);
        }
    }

    const onClearClick = () => {
        if (canClearProducts) {
            dispatch(clearProducts());
            dispatchToast("Panier vidé", "Le panier à été vidé.", "success",5000);
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

    const toggle = () => setModal(!modal);

    return (
        <Container className={"margin-bottom-10vh"}>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Déconnexion</ModalHeader>
                <ModalBody>
                    Êtes-vous sûr de vouloir vous déconnecter ?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Annuler
                    </Button>
                    {' '}
                    <Button color="danger" onClick={() => {
                        onClearClick();
                        setModal(false);
                    }}>
                        Vider le panier
                    </Button>
                </ModalFooter>
            </Modal>
            <CartStatement step={0} />
            <Row>
                <Col xs={7}>
                    {
                        canPay ?
                            products.map((product, index) => <ProductListItemCart key={index} product={product}/>)
                            :
                            <p>Aucun produit dans le panier.</p>
                    }
                </Col>
                <Col sm={{offset : 1, size: 3}}>
                    <Row>
                        <CartTicket products={products}/>
                    </Row>

                    <Row>
                        <Button
                            onClick={onCommanderClick}
                            className={"bg-primary-red border-0  fw-semibold"}
                            block
                            size="lg"
                            disabled={!canPay}
                        >
                            Commander
                        </Button>
                    </Row>
                    <Row className={"margin-top-10vh"}>
                        <Button
                            onClick={toggle}
                            className={"bg-danger border-0 fw-semibold"}
                            block
                            size="lg"
                            disabled={!canClearProducts}
                        >
                            Vider le panier
                        </Button>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Cart;
