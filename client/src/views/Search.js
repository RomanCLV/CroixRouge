import React, {useEffect, useState} from "react";
import "../styles/Search.css";
import {
    Button,
    Col,
    Container,
    Row
} from "reactstrap";
import {useLoaderData} from "react-router-dom";
import SearchBar from "../components/SearchBar";
import FiltersSection from "../components/FiltersSection";
//import {getProductById, searchProducts} from "../data/data";
import {useDispatch, useSelector} from "react-redux";
//import {selectCity} from "../store/slices/citySlice";
import ProductCard from "../components/ProductCard";
import {selectSearch, setSearch} from "../store/slices/searchSlice";

const Search = () => {

    const query = useLoaderData();
    const dispatch = useDispatch();
    //const city = useSelector(selectCity);
    const search = useSelector(selectSearch);
    const products = [];

    const [searchIsSet, setSearchIsSet] = useState(false);
    const [limit, setLimit] = useState(20);

    useEffect(() => {
        if (!searchIsSet) {
            setSearchIsSet(true);
            dispatch(setSearch(query));
        }
    }, [searchIsSet, search, query , dispatch])

    const onSeeMoreClick = () => {
        setLimit(limit + 20);
    };

    return (
        <div className={"Search"}>
            <SearchBar />
            <div className={"search-container"}>
                <FiltersSection query={query} />
                <div className={"search-result-container"}>
                    <Container className={"mainContentView"}>
                        <Row xs={12}>
                            <h2>Résultat{products.length > 1 ? "s" : ""} ({products.length})</h2>
                        </Row>
                        <Row xs={12}>
                            {
                                products.length > 0 ?
                                    products.map((id, index) =>
                                        index < limit ?
                                        <Col lg={3} md={4} sm={6} key={index}>
                                            <ProductCard product={index} />
                                        </Col>
                                    :
                                    null
                                    )
                                    :
                                    <p className={"margin-top-20px"}>Aucun produit ne correspond à votre recherche.</p>
                            }
                        </Row>
                        {
                            products.length > limit && <Row>
                                <Col xs={2}>
                                    <Button
                                        color="primary"
                                        onClick={onSeeMoreClick}
                                        outline
                                    >
                                        Voir plus
                                    </Button>
                                </Col>
                            </Row>
                        }
                    </Container>
                </div>
            </div>
        </div>
    );
}

export default Search;
