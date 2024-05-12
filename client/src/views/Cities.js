import "../styles/Cities.css";
import React, {useState} from "react";
import {useLoaderData} from "react-router-dom";
import {
    Col,
    Container, Input,
    Row
} from "reactstrap";
import CitiesMap from "../components/CitiesMap";
import CityCard from "../components/CityCard";

const Cities = () => {
    const cities = useLoaderData();
    const [citiesToDisplay, setCitiesToDisplay] = useState(cities);

    const onInputChanged = (value) => {
        const newCities = cities.filter(city => city.name.toLowerCase().includes(value));
        setCitiesToDisplay(newCities);
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
                    citiesToDisplay.length === 0 ?
                        <p>Aucune ville.</p>
                        :
                        <Row className={"margin-top-10vh margin-bottom-10vh"}>
                            {
                                citiesToDisplay.map((city, index) =>
                                    index < 8 ?
                                        <Col key={city.id} lg={3} md={4} sm={6}>
                                            <CityCard city={city} />
                                        </Col>
                                        :
                                        null
                                )
                            }
                        </Row>
                }
                <CitiesMap cities={cities} />
            </Container>
        </div>
    );
}

export default Cities;
