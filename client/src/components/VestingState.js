import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const VestingState = (props) => {

    let vestingState = parseInt(props.state) || 1;
    if (vestingState > 5) {
        vestingState = 5;
    }
    else if (vestingState < 1) {
        vestingState = 1;
    }

    const stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(vestingState - 1 >= i);
    }

    return (
        <div>
            <p>Vestuté :</p>
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