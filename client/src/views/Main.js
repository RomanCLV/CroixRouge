import "../styles/Main.css";
import React, {useEffect, useState, useCallback} from "react";
import {
    Container, Row, Col, Button
} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {selectCity} from "../store/slices/citySlice";
import {useDispatch, useSelector} from "react-redux";
import {clearSearch} from "../store/slices/searchSlice";
import {getProductById} from "../data/data";
import SearchBar from "../components/SearchBar";
import ProductsList from "../components/ProductsList";
import {ROUTES} from "../router/routes";
import { isAdmin } from "../services/usersService";
import { status } from "../services/authService";

const Main = () => {
    const navigate = useNavigate();
    const city = useSelector(selectCity);
    const dispatch = useDispatch();
    const [firstRender, setFirstRender] = useState(true);
    const [categories, setCategories] = useState([]);
    const [isCityAdmin, setIsCityAdmin] = useState(false);

    const fetchIsAdmin = useCallback(async () => {
        const currentJWT = localStorage.getItem("jwt");
        if (currentJWT) {
            const isJwtValid = await status(currentJWT);
            if (isJwtValid.error) {
                localStorage.removeItem("jwt");
            }
            else {
                localStorage.setItem("jwt", isJwtValid.jwt);
                const isAdminResult = await isAdmin(isJwtValid.jwt, city);
                if (!isAdminResult.error && isCityAdmin !== isAdminResult.value) {
                    setIsCityAdmin(isAdminResult.value);
                }
            }
        }
    }, [isCityAdmin, city])

    useEffect(() => {
       if (firstRender) {
           setFirstRender(false);
           dispatch(clearSearch());
           fetchIsAdmin();

           const tempCategories = [];
           city.products.forEach(productId => {
               const product = getProductById(productId);
                if (product) {
                    const category = tempCategories.find(item => item.category === product.category);
                    if (category) {
                        category.products.push(product);
                    }
                    else {
                        tempCategories.push({ category: product.category, products: [product] });
                    }
                }
           });
           setCategories(tempCategories);
       }
    }, [firstRender, categories, city.products, dispatch, fetchIsAdmin]);

    const onCreateClick = () => {
        navigate(ROUTES.addProduct);
    }

    return (
        <div>
            <div className={"redFilledRectangle"}>
                <Container>
                    <p className={"slogan"}>Donne une seconde vie à tes vêtements préférés</p>
                </Container>
            </div>
            <SearchBar />
            {
                isCityAdmin && 
                <Container className={"margin-top-10vh"}>
                    <Row>
                        <Col xs={2}>
                            <Button
                                onClick={onCreateClick}
                                className={"bg-primary-red border-0  fw-semibold"}
                                block
                                size="lg">
                                Créer un produit
                            </Button>
                        </Col>
                    </Row>
                </Container>
            }
            <Container>
                {
                    categories.map((category, index) =>
                        <ProductsList
                            key={index}
                            category={category.category}
                            products={category.products}
                            seeMore={ROUTES.search + "/categories=" + category.category}
                        />)
                }
            </Container>
        </div>
    );
}

export default Main;
