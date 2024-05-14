import "../styles/Cities.css";
import React, {useCallback, useEffect, useState} from "react";
import {
    Button,
    Col,
    Container, Input,
    Row
} from "reactstrap";
import {useNavigate} from "react-router-dom";
import CitiesMap from "../components/CitiesMap";
import CityCard from "../components/CityCard";
import { getCities, getCitiesCoordinates } from "../services/citiesService";
import { isSuperAdmin } from "../services/usersService";
import { status } from "../services/authService";
import { ROUTES } from "../router/routes";

const Cities = () => {
    const navigate = useNavigate();
    const CITIES_LIMIT = 8;
    const [hasFetch, setHasFetch] = useState(false);
    const [cities, setCities] = useState([]);
    const [citiesCoordinates, setCitiesCoordinates] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

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

    const fetchIsSuperAdmin = useCallback(async () => {
        const currentJWT = localStorage.getItem("jwt");
        if (currentJWT) {
            const isJwtValid = await status(currentJWT);
            if (isJwtValid.error) {
                localStorage.removeItem("jwt");
            }
            else {
                localStorage.setItem("jwt", isJwtValid.jwt);
                const isAdminResult = await isSuperAdmin(isJwtValid.jwt);
                if (!isAdminResult.error && isAdmin !== isAdminResult.value) {
                    setIsAdmin(isAdminResult.value);
                }
            }
        }
    }, [isAdmin])

    useEffect(() => {
        if (!hasFetch) {
            setHasFetch(true);
            fetchCitiesCoordinates();
            fetchCities();
            fetchIsSuperAdmin();
        }

    }, [hasFetch, fetchIsSuperAdmin])

    const onInputChanged = async (value) => {
        await fetchCities(value);
    }

    const onCreateClick = () => {
        navigate(ROUTES.addCity);
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
                {
                    isAdmin && <Row>
                        <Button
                            onClick={onCreateClick}
                            className={"bg-primary-red border-0  fw-semibold"}
                            block
                            size="lg">
                            Créer un magasin
                        </Button>
                    </Row>
                }
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
