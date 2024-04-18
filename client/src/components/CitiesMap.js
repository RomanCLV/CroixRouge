import React from "react";
import Map from "./Map";
import "../styles/Cities.css"

const CitiesMap = () => {

    const MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

    return (
        <div>
            <h2>Retrouvez nous partout en France</h2>
            {
                MAPS_API_KEY ?
                    <div id={"google-map-container"} className={"mapContainer"}>
                        <Map />
                    </div>
                    :
                    <p className={"errorElement"}>Clé d'API Google Maps Javascript non trouvé.</p>
            }
        </div>
    );
}

export default CitiesMap;