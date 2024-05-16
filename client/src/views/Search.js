import React, {useCallback, useEffect, useState} from "react";
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
import {useDispatch, useSelector} from "react-redux";
import ProductCard from "../components/ProductCard";
import {selectSearch, setSearch} from "../store/slices/searchSlice";
import { searchProducts } from "../services/productsService";
import { getNavigateUrlSearch } from "../components/FiltersSection";

const Search = () => {

    const query = useLoaderData();
    const dispatch = useDispatch();
    const search = useSelector(selectSearch);

    const [products, setProducts] = useState([]);

    const [searchIsSet, setSearchIsSet] = useState(false);
    const [limit, setLimit] = useState(20);

    const fetchProducts = useCallback(async () => {
        const result = await searchProducts(getNavigateUrlSearch(query));
        if (result.products) {
            setProducts(result.products)
        }
    }, [query])

    useEffect(() => {
        if (!searchIsSet) {
            setSearchIsSet(true);
            dispatch(setSearch(query));
        }
        fetchProducts();
    }, [searchIsSet, search, query , dispatch, fetchProducts])

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
                                    products.map((product, index) =>
                                        index < limit ?
                                        <Col lg={3} md={4} sm={6} key={index}>
                                            <ProductCard product={product} />
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
