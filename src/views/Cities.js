import React from "react";
import {
    Link,
    useLoaderData
} from "react-router-dom";
import {
    Container,
} from "reactstrap";
import "../styles/City.css";

const Cities = () => {

    // const [cities, setCities] = useState([]);
    //
    // useEffect(() => {
    //     const fetchedCities = getCities().sort((a, b) => a.name.localeCompare(b.name));
    //     let hasToSetCities = fetchedCities.length !== cities.length;
    //     if (hasToSetCities) {
    //         setCities(fetchedCities);
    //     }
    //     else {
    //         for (const city of cities) {
    //             const match = fetchedCities.find(fetchedCity => city.id === fetchedCity);
    //             hasToSetCities = match != null;
    //             if (hasToSetCities) {
    //                 break;
    //             }
    //         }
    //         if (hasToSetCities) {
    //             setCities(fetchedCities);
    //         }
    //     }
    // }, [cities]);

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
        </Container>
    );
}

export default Cities;
