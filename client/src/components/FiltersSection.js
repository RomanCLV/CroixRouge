import "../styles/FiltersSection.css";
import React, { useCallback, useEffect, useState } from "react";
import {
    Button,
    Container, FormGroup, FormText, Input, Label
} from "reactstrap";
import CheckBoxGroup from "./CheckBoxGroup";
// import {CATEGORIES, GENDER, SIZE} from "../data/dataType";
import {useDispatch} from "react-redux";

import {
    clearSearch,
    setSearchCategories,
    setSearchMaximumPrice,
    setSearchMinimumPrice
} from "../store/slices/searchSlice";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../router/routes";
import VestingStateFilter from "./VestingStateFilter";
// import {selectCity} from "../store/slices/citySlice";
import { getGenders } from "../services/gendersService";
import { getSizes } from "../services/sizesService";
import { getCategories } from "../services/categoriesService";


export const getNavigateUrlSearch = (query) => {
    console.log("getNavigateUrlSearch:", query)
    let url = "";
    const add = (str) => {
        if (url.length !== 0) {
            url += "&";
        }
        url += str
    }
    if (query.city) {
        add("city=" + query.city);
    }
    if (query.text) {
        add("text=" + query.text)
    }
    if (query.categories && query.categories.length > 0) {
        add("categories=" + query.categories.join("|"));
    }
    if (query.genders && query.genders.length > 0) {
        add("genders=" + query.genders.join("|"));
    }
    if (query.sizes && query.sizes.length > 0) {
        add("sizes=" + query.sizes.join("|"));
    }
    if (query.state && query.state > 1) {
        add("state=" + query.state);
    }
    if (query.minimumPrice && query.minimumPrice > 0) {
        add("minimumPrice=" + query.minimumPrice);
    }
    if (query.maximumPrice && query.maximumPrice < 10000) {
        add("maximumPrice=" + query.maximumPrice);
    }
    return url;
}

export const navigateSearch = (url, navigate) => {
    navigate(ROUTES.search + (url ? "/" + url : ""));
}

const FiltersSection = (props) => {

    const query = {...props.query};
    const [genders, setGenders] = useState([]); 
    const [sizes, setSizes] = useState([]); 
    const [categories, setCategories] = useState([]); 

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const fetchGenders = useCallback(async () => {
        const result = await getGenders();
        if (result.genders) {
            setGenders(result.genders);
        }
    }, [])
    
    const fetchCategories = useCallback(async () => {
        const result = await getCategories();
        if (result.categories) {
            setCategories(result.categories);
        }
    }, [])
    
    const fetchSizes = useCallback(async () => {
        const result = await getSizes();
        if (result.sizes) {
            setSizes(result.sizes);
        }
    }, [])

    useEffect(() => {
        fetchGenders();
        fetchCategories();
        fetchSizes();
    }, [fetchGenders, fetchCategories, fetchSizes])

    const onCategoryCheckboxClick = (value) => {
        if (query.categories.includes(value)) {
            query.categories = query.categories.filter(v => value !== v);
        }
        else {
            query.categories = query.categories.concat(value);
        }
        dispatch(setSearchCategories(query.categories));
        navigateSearch(getNavigateUrlSearch(query), navigate);
    }

    const onGenderCheckboxClick = (value) => {
        if (query.genders.includes(value)) {
            query.genders = query.genders.filter(v => value !== v);
        }
        else {
            query.genders = query.genders.concat(value);
        }
        dispatch(setSearchCategories(query.genders));
        navigateSearch(getNavigateUrlSearch(query), navigate);
    }

    const onSizeCheckboxClick = (value) => {
        if (query.sizes.includes(value)) {
            query.sizes = query.sizes.filter(v => value !== v);
        }
        else {
            query.sizes = query.sizes.concat(value);
        }
        dispatch(setSearchCategories(query.sizes));
        navigateSearch(getNavigateUrlSearch(query), navigate);
    }

    const minimumPriceChanged = (value) => {
        dispatch(setSearchMinimumPrice(value));
        query.minimumPrice = value;
        navigateSearch(getNavigateUrlSearch(query), navigate);
    }

    const maximumPriceChanged = (value) => {
        dispatch(setSearchMaximumPrice(value));
        query.maximumPrice = value;
        navigateSearch(getNavigateUrlSearch(query), navigate);
    }

    const onRemoveFilters = () => {
        dispatch(clearSearch());
        navigate(ROUTES.search);
    }

    return (
        <div className={"filters-container"}>
            <Container className={"margin-top-10vh"}>
                <h3>Filtres</h3>
                <Container className={"margin-20px-0"}>
                    <Button onClick={onRemoveFilters}>
                        Retirer les filtres
                    </Button>
                </Container>
                <CheckBoxGroup
                    title={"Catégories"}
                    values={Object.values(categories)}
                    selectedValues={query.categories}
                    onClick={onCategoryCheckboxClick} />

                <CheckBoxGroup
                    title={"Genre"}
                    values={Object.values(genders)}
                    selectedValues={query.genders}
                    onClick={onGenderCheckboxClick} />
                <CheckBoxGroup
                    title={"Taille"}
                    values={Object.values(sizes)}
                    selectedValues={query.sizes}
                    onClick={onSizeCheckboxClick} />
                <VestingStateFilter
                    vestingState={query.state} />
                <Container>
                    <FormGroup>
                        <Label for="minimumPrice">
                            <FormText>Prix minimum :</FormText>
                        </Label>
                        <Input
                            id="minimumPrice"
                            name="minimumPrice"
                            placeholder="Minimum"
                            type="number"
                            value={query.minimumPrice}
                            onChange={e => minimumPriceChanged(e.target.value)}
                            min={0}
                            max={9999}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="maximumPrice">
                            <FormText>Prix maximum :</FormText>
                        </Label>
                        <Input
                            id="maximumPrice"
                            name="maximumPrice"
                            placeholder="Maximum"
                            type="number"
                            value={query.maximumPrice}
                            onChange={e => maximumPriceChanged(e.target.value)}
                            min={1}
                            max={10000}
                        />
                    </FormGroup>
                </Container>
            </Container>
        </div>
    );
}

export default FiltersSection;
