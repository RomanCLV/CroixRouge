import React from "react";
import {
    Link,
    useLoaderData
} from "react-router-dom";
import {
    Container,
} from "reactstrap";
import "../styles/City.css";
import {ROUTES} from "../router/routes";

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
                                    <Link to={ROUTES.city + "/" + city.name}>{city.name}</Link>
                                </li>
                            )
                        }
                    </ul>
            }
        </Container>
    );
}

export default Cities;
