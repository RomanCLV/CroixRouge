import React, { useCallback, useEffect, useState } from "react";
import {
    Col,
    Row
} from "reactstrap";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectCity} from "../store/slices/citySlice";
import ProductCard from "./ProductCard";
import { searchProducts } from "../services/productsService";


const ProductsList = (props) => {

    const city = useSelector(selectCity);
    const category = props.category;
    const [products, setProducts] = useState([]);
    const redirect = props.seeMore || "";

    const fetchProducts = useCallback(async () => {
        const result = await searchProducts(`city=${city.name}&categories=${category}&limit=4`);
        if (result.error) {

        }
        else {
            setProducts(result.products);
        }
    }, [city.name, category])

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Row className={"product-list-container"}>
            <h3 className={"product-list-category"}>{props.title || category}</h3>
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
