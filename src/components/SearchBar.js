import React, {useState} from "react";
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

import {ROUTES} from "../router/routes";
import {selectSearch, setSearch} from "../store/slices/searchSlice";
import "../styles/Account.css";

const SearchBar = () => {

    const search = useSelector(selectSearch);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [localSearch, setLocalSearch] = useState(search.toString());

    const onSearchButtonClick = () => {
        navigate(ROUTES.search + "/" + localSearch);
    };

    const onTextChanged = (value) => {
        dispatch(setSearch(value));
        setLocalSearch(value);
    };

    return (
        <div className={"redFilledRectangle search-bar-container"}>
            <Container>
                <Row className="row-cols-lg-auto g-3 justify-content-center align-items-center">
                    <Col>
                        <Input
                            placeholder={"Recherche"}
                            value={localSearch}
                            onChange={e => onTextChanged(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <Button color="primary" onClick={onSearchButtonClick} >
                            <FontAwesomeIcon icon={faMagnifyingGlass} color={"white"} />
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SearchBar;
