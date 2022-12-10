import React from "react";
import {
    Link,
    useLoaderData
} from "react-router-dom";
import {
    Container,
} from "reactstrap";
import "../styles/City.css";
import CitiesMap from "../components/CitiesMap";

const Cities = () => {

    const cities = useLoaderData();

    return (
        <Container>
            <h2>City</h2>
            {
                cities.length === 0 ?
                    <p>Aucune ville.</p>
                    :
                    <ul>
                        {
                            cities.map(city =>
                                <li key={city.id}>
                                    <Link to={"/city/" + city.name}>{city.name}</Link>
                                </li>
                            )
                        }
                    </ul>
            }
            <CitiesMap cities={cities} />
        </Container>
    );
}

export default Cities;
