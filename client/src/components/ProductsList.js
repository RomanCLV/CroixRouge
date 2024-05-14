import React, { useEffect, useState } from "react";
import {
    Col,
    Row
} from "reactstrap";
import ProductCard from "./ProductCard";
import {Link} from "react-router-dom";

const ProductsList = (props) => {

    const category = props.category;
    const [products, setProducts] = useState([]);
    const redirect = props.seeMore || "";

    useEffect(() => {
        if (false) {
            setProducts([]);
        }
    }, []);

    return (
        <Row className={"product-list-container"}>
            <h3 className={"product-list-category"}>{category}</h3>
            {
                products.length === 0 ?
                <p>Pas de produit.</p>
                :
                products.map(product =>
                    <Col key={product.id} lg={3} md={4} sm={6}>
                        <ProductCard product={product} />
                    </Col>
                )
            }
            {
                products.length !== 0 && redirect && <Link to={redirect}>Voir plus</Link>
            }
        </Row>
    );
}

export default ProductsList;
