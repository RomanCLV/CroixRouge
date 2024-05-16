import React, {useCallback, useEffect, useRef, useState} from "react";
import "../styles/map.css";
import {Spinner} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import GoogleMap from "google-maps-react-markers";
import { getCities } from "../services/citiesService";

const Marker = () => <FontAwesomeIcon
    icon={faLocationDot}
    className={"pin color-primary-red"}
    size={"xl"} />;

const Map = () => {

    const mapRef = useRef(null);
    // eslint-disable-next-line
    const [mapReady, setMapReady] = useState(false);
    const [zoom, setZoom] = useState(5.7);
    const [isZoomSet, setIsZoomSet] = useState(false);
    const [cities, setCities] = useState([]);

    const fetchCities = useCallback(async () => {
        const result = await getCities();
        if (result.cities) {
            setCities(result.cities);
        }
    }, [setCities])

    useEffect(() => {
        const trySetZoom = () => {
            const mapContainer = document.getElementById("google-map-container");
            if (mapContainer) {
                const z = getDefaultZoom(mapContainer.clientHeight);
                if (z !== zoom) {
                    setZoom(z);
                }
            }
            else {
                setTimeout(trySetZoom, 1000);
            }
        }

        if (!isZoomSet) {
            setIsZoomSet(true);
            trySetZoom();
        }

        fetchCities();
    },  [zoom, isZoomSet, fetchCities] )

    const onGoogleApiLoaded = ({ map, maps }) => {
        mapRef.current = map;
        setMapReady(true);
    };

    const onMarkerClick = (markerId) => {
        console.log("This is ->", markerId);
    };

    const getDefaultZoom = (height) => {
        const p1 = {
            x: 531,
            y: 5.7
        }
        const p2 = {
            x: 320,
            y: 5.0
        }
        const a = (p2.y - p1.y)/(p2.x - p1.x);
        const b = p1.y - a * p1.x;
        return Math.round((a * height + b) * 10) / 10;
    }

    return (
        <GoogleMap
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
            defaultCenter={{ lat: 46.603354, lng: 1.8883335 }}
            defaultZoom={zoom}
            //options={mapOptions}
            mapMinHeight="60vh"
            onGoogleApiLoaded={onGoogleApiLoaded}
            // onChange={(map) => console.log("Map moved", map)}
            //yesIWantToUseGoogleMapApiInternals
            loadingContent={<Spinner />}
        >
            {
                cities.map( (city, index) =>
                    <Marker
                        key={index}
                        lat={city.lat}
                        lng={city.lng}
                        markerId={city.id}
                        onClick={() => onMarkerClick(city)}
                    />
                )
            }
        </GoogleMap>
    );
}

export default Map;
