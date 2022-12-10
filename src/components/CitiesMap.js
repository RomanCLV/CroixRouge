import React from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {Spinner} from "reactstrap";

const CitiesMap = (props) => {

    const cities = props.cities || [];

    const render = (status) => {
        console.log("status:", status)
        switch (status) {
            case Status.LOADING:
                return <Spinner />;
            case Status.FAILURE:
                return <p>Impossible d'afficher la Map.</p>;
            case Status.SUCCESS:
                return <p>Ouiiii</p>;
        }
    };

    return (
        <div>
            <h2>Retrouvez nous partout en France</h2>

            <Wrapper apiKey={"YOUR_API_KEY"} render={render} />
        </div>
    );
}

export default CitiesMap;