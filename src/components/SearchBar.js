import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import {
    Container,
    Col,
    Row,
    Input,
    Button,
} from "reactstrap";

import "../styles/Account.css";
import {selectSearch, setSearchText} from "../store/slices/searchSlice";
import {getNavigateUrlSearch, navigateSearch} from "./FiltersSection";

const SearchBar = () => {

    const dispatch = useDispatch();
    const query = useSelector(selectSearch);
    const navigate = useNavigate();

    const onSearchButtonClick = () => {
        navigateSearch(getNavigateUrlSearch(query), navigate);
    };

    const onTextChanged = (value) => {
        dispatch(setSearchText(value));
    };

    return (
        <div className={"redFilledRectangle search-bar-container"}>
            <Container>
                <Row>
                    <Col xs={{size: 4, offset: 4}}>
                        <Input
                            type="search"
                            id="search"
                            placeholder="Recherche"
                            onChange={e => onTextChanged(e.target.value)}
                            value={query.text}
                        />
                    </Col>
                    <Col>
                        <Button color="primary" onClick={onSearchButtonClick} className={"border-0"} >
                            <FontAwesomeIcon icon={faMagnifyingGlass} color={"white"} />
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SearchBar;
