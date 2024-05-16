import React, {useEffect} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {ROUTES} from "../router/routes";
import {useNavigate} from "react-router-dom";
import CartStatement from "../components/CartStatement";
import {useDispatch, useSelector} from "react-redux";
import {clearCommand, selectCommand} from "../store/slices/commandSlice";
import ProductListItemCart from "../components/ProductListItemCart";
import CartTicket from "../components/CartTicket";

const PaymentDone = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const command = useSelector(selectCommand);
    console.log(command)

    useEffect(() => {
        if (!command) {
            navigate(ROUTES.root);
        }
    }, [command, navigate, dispatch])

    const onContinuerClick = () => {
        dispatch(clearCommand());
        navigate(ROUTES.root);
    }

    return (
        <Container>
            <CartStatement step={2} />
            <div className={"d-flex justify-content-center"}>
                <h2>Votre commande à bien été enregistré</h2>
            </div>
            <Container className={"mainContentView"}>
                <Row>
                    <Col xs={7}>
                        <Row>
                            {
                                command.map((product, index) => <ProductListItemCart
                                    key={index} product={product} canDelete={false}/>)
                            }
                        </Row>
                    </Col>
                    <Col sm={{offset : 1, size: 3}}>
                        <Row>
                            <CartTicket products={command}/>
                        </Row>
                    </Col>
                </Row>
            </Container>
            <div className={"d-flex justify-content-center mainContentView"}>
                <Button
                    onClick={onContinuerClick}
                    className={"bg-primary-red border-0 fw-semibold"}
                >
                    Continuer
                </Button>
            </div>
        </Container>
    );
}

export default PaymentDone;
