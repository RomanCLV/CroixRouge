import React from "react";
import {Container, FormText} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as solidStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as regularStar} from "@fortawesome/free-regular-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {selectSearch, setSearchState} from "../store/slices/searchSlice";
import {getNavigateUrlSearch, navigateSearch} from "./FiltersSection";
import {useNavigate} from "react-router-dom";

const VestingStateFilter = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = {...useSelector(selectSearch)};

    let state = parseInt(props.state) || 1;
    if (state < 1) {
        state = 1;
    }
    else if (state > 5) {
        state = 5;
    }

    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(state - 1 >= i);
    }

    const onStarClick = (value) => {
        dispatch(setSearchState(value));
        query.state = value;
        navigateSearch(getNavigateUrlSearch(query), navigate);
    }

    return (
        <Container>
            <FormText>Etat :</FormText>
            <div>
                {
                    stars.map((star, index) => star ?
                        <FontAwesomeIcon className={"cursor-pointer"} key={index} icon={solidStar} color={"gold"} onClick={() => onStarClick(index + 1)} /> :
                        <FontAwesomeIcon className={"cursor-pointer"} key={index} icon={regularStar} color={"gold"} onClick={() => onStarClick(index + 1)} />
                    )
                }
            </div>
        </Container>
    );
}

export default VestingStateFilter;
