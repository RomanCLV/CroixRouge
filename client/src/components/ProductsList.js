import React from "react";
import {
    Col,
    Row
} from "reactstrap";
import ProductCard from "./ProductCard";
import {Link} from "react-router-dom";

const ProductsList = (props) => {

    const category = props.category;
    const products = props.products;
    const redirect = props.seeMore || "";

    const productsToDisplay = [];
    for (let i = 0; i < Math.min(products.length, 4); i++) {
        productsToDisplay.push(products[i]);
    }

    return (
        <Row className={"product-list-container"}>
            <h3 className={"product-list-category"}>{category}</h3>
            {
                productsToDisplay.map(product =>
                    <Col key={product.id} lg={3} md={4} sm={6}>
                        <ProductCard product={product} />
                    </Col>
                )
            }
            {
                redirect && <Link to={redirect}>Voir plus</Link>
            }
        </Row>
    );
}

export default ProductsList;
