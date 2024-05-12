import "../styles/Cities.css";
import React, {useEffect, useState} from "react";
import {
    Col,
    Container, Input,
    Row
} from "reactstrap";
import CitiesMap from "../components/CitiesMap";
import CityCard from "../components/CityCard";
import { getCities, getCitiesCoordinates } from "../services/citiesService";

const Cities = () => {
    const CITIES_LIMIT = 8;
    const [hasFetch, setHasFetch] = useState(false);
    const [cities, setCities] = useState([]);
    const [citiesCoordinates, setCitiesCoordinates] = useState([]);

    const fetchCities = async (name=null) => {
            const data = await getCities(CITIES_LIMIT, name);
        if (data.cities) {
            setCities(data.cities);
        }
    }

    const fetchCitiesCoordinates = async () => {
            const data = await getCitiesCoordinates();
        if (data.coordinates) {
            setCitiesCoordinates(data.coordinates);
        }
    }

    useEffect(() => {
        if (!hasFetch) {
            setHasFetch(true);
            fetchCitiesCoordinates();
            fetchCities();
        }

    }, [hasFetch])

    const onInputChanged = async (value) => {
        await fetchCities(value);
    }

    return (
        <div>
            <div className={"redFilledRectangle"}>
                <Container>
                    <Row>
                        <Col md={{size: 4, offset: 4}} xs={{size: 8, offset: 2}}>
                            <Input
                                type="search"
                                id="search"
                                placeholder="Ville"
                                onChange={e => onInputChanged(e.target.value.toLowerCase())}
                            />
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container className={"margin-top-10vh"}>
                <h2>Sélectionnez votre magasin</h2>
                {
                    cities.length === 0 ?
                        <p>Aucune ville.</p>
                        :
                        <Row className={"margin-top-10vh margin-bottom-10vh"}>
                            {
                                cities.map((city, index) =>
                                    index < 8 ?
                                        <Col key={index} lg={3} md={4} sm={6}>
                                            <CityCard key={index} city={city} />
                                        </Col>
                                        :
                                        null
                                )
                            }
                        </Row>
                }
                <CitiesMap cities={citiesCoordinates} />
            </Container>
        </div>
    );
}

export default Cities;
