import React from "react";
import {Container, FormText} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as solidStar} from "@fortawesome/free-solid-svg-icons";
import {faStar as regularStar} from "@fortawesome/free-regular-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import {selectSearch, setSearchVestingState} from "../store/slices/searchSlice";
import {getNavigateUrlSearch, navigateSearch} from "./FiltersSection";
import {useNavigate} from "react-router-dom";

const VestingStateFilter = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = {...useSelector(selectSearch)};

    let vestingState = parseInt(props.vestingState) || 1;
    if (vestingState < 1) {
        vestingState = 1;
    }
    else if (vestingState > 5) {
        vestingState = 5;
    }

    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(vestingState - 1 >= i);
    }

    const onStarClick = (value) => {
        dispatch(setSearchVestingState(value));
        query.vestingState = value;
        navigateSearch(getNavigateUrlSearch(query), navigate);
    }

    return (
        <Container>
            <FormText>Etat de vestuté :</FormText>
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
