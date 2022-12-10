import React from "react";
import {Card, CardBody, CardImg, CardSubtitle, CardTitle, Col, Row} from "reactstrap";
import VestingState from "./VestingState";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../router/routes";

const ProductCard = (props) => {

    const navigate = useNavigate();
    const product = props.product;

    const onClick = () => {
        navigate(ROUTES.product + "/" + product.id);
    }

    return (
        <Card className={'ProductCard'} onClick={onClick}>
            <CardImg
                alt="Card image cap"
                src={product.images[0]}
                top
                width="100%"
            />
            <CardBody>
                <CardTitle tag="h5">
                    {product.name}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    <Row className={"d-flex flex-wrap flex-sm-wrap"}>
                        <Col className={"d-flex"}>
                            <p>{product.gender}</p>
                        </Col>
                        <Col className={"d-flex justify-content-end"}>
                            <VestingState vestingState={product.vestingState} />
                        </Col>
                    </Row>
                    <Row>
                        <p>{product.price}€</p>
                    </Row>
                    <Row>
                        <p>Taille : {product.size}</p>
                    </Row>
                </CardSubtitle>
            </CardBody>
        </Card>
    );
};

export default ProductCard;