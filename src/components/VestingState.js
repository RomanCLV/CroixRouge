import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const VestingState = (props) => {

    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(props.vestingState - 1 >= i);
    }

    return (
        <div>
            {
                stars.map((star, index) => star ?
                    <FontAwesomeIcon key={index} icon={solidStar} color={"gold"} /> :
                    <FontAwesomeIcon key={index} icon={regularStar} color={"gold"} />
                )
            }
        </div>
    );
}

export default VestingState;