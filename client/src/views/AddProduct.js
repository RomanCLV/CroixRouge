import { Container, Row, Col, FormGroup, Label, Input, InputGroup, InputGroupText, InputGroupAddon, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Dropdown } from 'reactstrap';
import StarRating from '../components/StarRating';
import { useState, useEffect } from 'react';
// import CarouselView from './Carousel';

import InputManager from "../components/InputManager";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";
import product from "../services/addProductService";

function AddProduct() {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const valid = valueNotEmpty(title) && valueNotEmpty(price) && valueNotEmpty(description);
        setIsFormValid(valid);
    }, [title, price, description]);

    const valueNotEmpty = (value) => value.length !== 0;

    const onTitleChanged = (value) => setTitle(value);
    const onPriceChanged = (value) => setPrice(value);
    const onDescriptionChanged = (value) => setDescription(value);

    const city = { id: 1 };
    const size = { id: 1 };
    const gender = { id: 1 };
    const category = { id: 1 };
    const state = 5;

    const createProductData = () => {
        const numeric = parseFloat(price, state);
        return { title, price: numeric, description, city, size, gender, category, state: numeric };
    };

    const onSubmit = async () => {
        const productData = createProductData();
        if (!isFormValid) {
            setErrorMessage("Veuillez saisir tous les champs obligatoires.");
            return;
        }

        console.log("Données du produit à envoyer :", productData);

        const result = await product(productData);
        if (result.error) {
            setErrorMessage(result.error.message);
        } else {
            navigate(ROUTES.addProduct);
        }
    };

    //Boutton Catégorie
    const [categories, setCategories] = useState([]);
    const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
    // Fonction pour basculer l'état du menu déroulant
    const toggleCategories = () => setCategoriesDropdownOpen((prevState) => !prevState);
    // Récupération des catégories
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/categories");
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    //Boutton Genre
    const [genders, setGenders] = useState([]);
    const [gendersDropdownOpen, setGendersDropdownOpen] = useState(false);
    const toggleGenders = () => setGendersDropdownOpen((prevState) => !prevState);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/genders");
                const data = await response.json();
                setGenders(data.genders);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    //Boutton Taille
    const [sizes, setSizes] = useState([]);
    const [sizesDropdownOpen, setSizesDropdownOpen] = useState(false);
    const toggleSizes = () => setSizesDropdownOpen((prevState) => !prevState);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/sizes");
                const data = await response.json();
                setSizes(data.sizes);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container>
            <Row>
                <Col md={6} style={{ background: "red" }}>
                    <Row>
                        {/* <CarouselView /> */}
                    </Row>
                    <Row>
                        <Col style={{ background: "green" }} >
                            <Button
                                color="primary"
                            >
                                Ajouter une image
                            </Button>
                        </Col>
                    </Row>

                </Col>
                <Col md={6} >
                    <Row>
                        <Col md={6} style={{ background: "green" }} >
                            <p>Titre :</p>
                            <FormGroup>
                                {
                                    errorMessage && <p className={"errorElement"}>{errorMessage}</p>
                                }
                                <InputManager
                                    id={"inputTitle"}
                                    name={"title"}
                                    label={"Nom de l'article"}
                                    placeholder={"Nom de l'article"}
                                    type={null}
                                    required={true}
                                    value={title}
                                    validators={[
                                        valueNotEmpty,
                                    ]}
                                    feedbackMessages={[
                                        "Champ obligatoire.",
                                        "Titre déjà utilisé."
                                    ]}
                                    onChange={onTitleChanged}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6} style={{ background: "green" }} >
                            <p>Prix :</p>
                            <FormGroup>
                                {
                                    errorMessage && <p className={"errorElement"}>{errorMessage}</p>
                                }
                                <InputManager
                                    id={"inputPrice"}
                                    name={"price"}
                                    label={"Prix de l'article"}
                                    placeholder={"Prix de l'article"}
                                    type={null}
                                    required={true}
                                    value={price}
                                    validators={[
                                        valueNotEmpty,
                                    ]}
                                    feedbackMessages={[
                                        "Champ obligatoire.",
                                        "Prix déjà utilisé."
                                    ]}
                                    onChange={onPriceChanged}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row
                        lg="4"
                        md="2"
                        sm="2"
                    >
                        <Col style={{ background: "#DD7777" }}>
                            <FormGroup>
                                <Label for="categories">Catégorie :</Label>
                                <Input type="select" name="selectCategory" id="selectCategory" isOpen={categoriesDropdownOpen} toggle={toggleCategories} disabled={categories.length === 0}>
                                    <option value="">Sélection</option>
                                    {categories.map((category, id) => (
                                        <option key={id} value={category}>{category}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col style={{ background: "yellow" }} >
                            <FormGroup>
                                <Label for="genders">Genre :</Label>
                                <Input type="select" name="selectGender" id="selectGender" isOpen={gendersDropdownOpen} toggle={toggleGenders} disabled={genders.length === 0}>
                                    <option value="">Sélection</option>
                                    {genders.map((gender, id) => (
                                        <option key={id} value={gender}>{gender}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col style={{ background: "#24BDDF" }}>
                            <FormGroup>
                                <Label for="sizes">Taille :</Label>
                                <Input type="select" name="selectSize" id="selectSize" isOpen={sizesDropdownOpen} toggle={toggleSizes} disabled={sizes.length === 0}>
                                    <option value="">Sélection</option>
                                    {sizes.map((size, id) => (
                                        <option key={id} value={size}>{size}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col style={{ background: "white" }} >
                            <Label for="stars">
                                Etat :
                            </Label>
                            <StarRating rating={3} />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ background: "#EEBEE3" }}>
                            <FormGroup>
                                <Label for="description">
                                    Description :
                                </Label>
                                <InputManager
                                    id={"inputDescription"}
                                    name={"description"}
                                    label={"Description de l'article"}
                                    placeholder="Description de l'annonce"
                                    type="textarea"
                                    required={true}
                                    value={description}
                                    validators={[
                                        valueNotEmpty,
                                    ]}
                                    feedbackMessages={[
                                        "Champ obligatoire.",
                                    ]}
                                    onChange={onDescriptionChanged}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ background: "#DD7777" }} >
                            <Button
                                color={"primary"}
                                onClick={onSubmit}
                                disabled={!isFormValid}
                            >
                                Soumettre l'article
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </Container >
    );
}

export default AddProduct;