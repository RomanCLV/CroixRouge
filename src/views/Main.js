import "../styles/Main.css";
import React, {useEffect, useState} from "react";
import {
    Container
} from "reactstrap";
import {selectCity} from "../store/slices/citySlice";
import {useDispatch, useSelector} from "react-redux";
import {clearSearch} from "../store/slices/searchSlice";
import {getProductById} from "../data/data";
import SearchBar from "../components/SearchBar";
import ProductsList from "../components/ProductsList";
import {ROUTES} from "../router/routes";

const Main = () => {

    const city = useSelector(selectCity);
    const dispatch = useDispatch();
    const [firstRender, setFirstRender] = useState(true);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
       if (firstRender) {
           setFirstRender(false);
           dispatch(clearSearch());
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
    }, [firstRender, categories, city.products, dispatch]);

    return (
        <div>
            <div className={"redFilledRectangle"}>
                <Container>
                    <p className={"slogan"}>Donne une seconde vie à tes vêtements préférés</p>
                </Container>
            </div>
            <SearchBar />
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
