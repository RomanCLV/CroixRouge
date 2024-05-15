import React, { useState , useEffect} from 'react';
import { Button, Container, Row, Col } from 'reactstrap'; // Import des composants depuis reactstrap
import InputManager from '../components/InputManager';
import ImagesSelector from '../components/ImagesSelector';
import { getCreateCity } from '../services/citiesService'; 
import { ROUTES } from "../router/routes";
import { useNavigate } from "react-router-dom";


function AddCity() {

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [url, setUrl] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const valueNotEmpty = (value) => value.length !== 0;

    useEffect(() => {
        
        const isValid = valueNotEmpty(name) && valueNotEmpty(address) && valueNotEmpty(url);
        if (isValid !== isFormValid) {
            setIsFormValid(isValid);
        }

    }, [name, address, url, isFormValid, setIsFormValid]);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    const onNameChanged = (value) => {
        setName(capitalizeFirstLetter(value));
    }

    const onAddressChanged = (value) => {
        setAddress(value);
    }

    const onLatitudeChanged = (value) => setLatitude(parseFloat(value));

    const onLongitudeChanged = (value) => setLongitude(parseFloat(value));
    
    const onSubmit = async () => {
        if (!isFormValid) {
            setErrorMessage("Veuillez saisir tous les champs obligatoires.");
            return;
        }

        const result = await getCreateCity(name,address,longitude,latitude,url);
        if (result.error) {
            setErrorMessage(result.error.message);
        }
        else {
            navigate(ROUTES.cities);
        }
    };

    const imageChanged = (urls) => {
        setUrl(urls.length === 0 ? "" : urls[0]);
    }

    return (
        <Container className={"margin-top-10vh"}>
            <Row>
                {
                    errorMessage && <p className={"errorElement"}>{errorMessage}</p>
                }
            </Row>
            <Row>
                <Col md={6}>
                    <ImagesSelector onUrlsChanged={imageChanged} />
                </Col>
                <Col md={6}>
                    <Row>
                        <h2>Ajout d'une ville</h2>
                    </Row>
                    <Row className={"margin-top-10vh"}>
                        <InputManager
                            id={"inputName"}
                            name={"name"}
                            label={"Nom de la ville"}
                            placeholder={"Nom de la ville"}
                            type={null}
                            required={true}
                            value={name}
                            validators={[
                                valueNotEmpty,
                            ]}
                            feedbackMessages={[
                                "Champ obligatoire.",
                            ]}
                            onChange={onNameChanged}
                        />
                    </Row>
                    <Row>
                        <InputManager
                            id={"inputAddress"}
                            name={"address"}
                            label={"Adresse"}
                            placeholder={"Adresse"}
                            type={null}
                            required={true}
                            value={address}
                            validators={[
                                valueNotEmpty,
                            ]}
                            feedbackMessages={[
                                "Champ obligatoire.",
                            ]}
                            onChange={onAddressChanged}
                        />
                    </Row>
                    <Row>
                        <Col md={6}>
                            <InputManager
                                id={"inputLat"}
                                name={"lat"}
                                label={"Latitude"}
                                placeholder={"Latitude"}
                                type={"number"}
                                required={true}
                                value={latitude}
                                validators={[
                                    valueNotEmpty,
                                ]}
                                feedbackMessages={[
                                    "Champ obligatoire.",
                                ]}
                                onChange={onLatitudeChanged}
                            />
                        </Col>
                        <Col md={6}>
                            <InputManager
                                id={"inputLong"}
                                name={"long"}
                                label={"Longitude"}
                                placeholder={"Longitude"}
                                type={"number"}
                                required={true}
                                value={longitude}
                                validators={[
                                    valueNotEmpty,
                                ]}
                                feedbackMessages={[
                                    "Champ obligatoire.",
                                ]}
                                onChange={onLongitudeChanged}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Button color="primary" onClick={onSubmit} disabled={!isFormValid}>Soumettre</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default AddCity;
