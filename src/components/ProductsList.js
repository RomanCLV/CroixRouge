import React from "react";
import {Col, Row} from "reactstrap";
import ProductCard from "./ProductCard";

const ProductsList = (props) => {

    const category = props.category;
    const products = props.products;

    const productsToDisplay = [];
    for (let i = 0; i < Math.min(products.length, 4); i++) {
        productsToDisplay.push(products[i]);
    }
    return (
        <Row className={"product-list-container"}>
            <h3 className={"product-list-category"}>{category}</h3>
            {
                productsToDisplay.map(product =>
                    <Col key={product.id} xs={"6"} sm={"6"} md={"4"} lg={"3"}>
                        <ProductCard product={product} />
                    </Col>
                )
            }
        </Row>
    );
}

export default ProductsList;
