import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";

import InputManager from "../components/InputManager";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../router/routes";
import product from "../services/addProductService";
import { selectCity } from '../store/slices/citySlice';

function AddProduct() {
    const navigate = useNavigate();
    const city = useSelector(selectCity);

    const [sizes, setSizes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [genders, setGenders] = useState([]);

    const [title, setTitle] = useState("");
    const [url, setUrl] = useState("https://www.google.com/url?sa=i&url=https%3A%2F%2Fgarcon-francais.fr%2Ffr%2Fslip-bleu-marine-homme-made-in-france&psig=AOvVaw3Lxm7RW45w7ZtjaW376Oov&ust=1715685825057000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCJD09fLBioYDFQAAAAAdAAAAABAE");
    const [price, setPrice] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [rate, setRate] = useState(3);
    const [description, setDescription] = useState("");

    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const valid = valueNotEmpty(title) && valueNotEmpty(price) && selectedCategory && selectedGender && selectedSize && valueNotEmpty(description);
        if (valid !== isFormValid) {
            setIsFormValid(valid);
        }
    }, [title, price, selectedCategory, selectedGender, selectedSize, description, isFormValid]);

    const valueNotEmpty = (value) => value.length !== 0;

    const onTitleChanged = (value) => setTitle(value);
    const onPriceChanged = (value) => setPrice(value);
    const onDescriptionChanged = (value) => setDescription(value);

    const createProductData = () => {
        return {
            title: title,
            price: price,
            description: description,
            city: "Paris",
            size: selectedSize,
            gender: selectedGender,
            category: selectedCategory,
            state: rate,
            images: [
                url
            ]
        };
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/genders`);
                const data = await response.json();
                setGenders(data.genders);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/sizes`);
                const data = await response.json();
                setSizes(data.sizes);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <Container className={"margin-top-10vh margin-bottom-10vh"}>
            <Row >
                <h2>Ajout d'un produit à {city}</h2>
            </Row>
            <Row>
                {
                    errorMessage && <p className={"errorElement"}>{errorMessage}</p>
                }
            </Row>
            <Row className={"margin-top-10vh"}>
                <Col md={6}>
                    <Row>
                        <Col md={9}>
                            <p>Image :</p>
                            <FormGroup>
                                <InputManager
                                    id={"inputProductImagePath"}
                                    name={"productImagePath"}
                                    label={"Lien URL de l'image"}
                                    placeholder={"Lien URL de l'image"}
                                    type={null}
                                    required={true}
                                    value={url}
                                    validators={[
                                        valueNotEmpty,
                                    ]}
                                    feedbackMessages={[
                                        "Champ obligatoire."
                                    ]}
                                    onChange={setUrl}

                                />
                            </FormGroup>
                        </Col>
                    </Row>
                </Col>
                <Col md={6}>
                    <Row>
                        <Col md={6}>
                            <p>Titre :</p>
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
                                    "Champ obligatoire."
                                ]}
                                onChange={onTitleChanged}

                            />
                        </Col>
                        <Col md={6}>
                            <p>Prix :</p>
                            <InputManager
                                id={"inputPrice"}
                                name={"price"}
                                label={"Prix de l'article"}
                                placeholder={"Prix de l'article"}
                                type={"number"}
                                required={true}
                                value={price}
                                validators={[
                                    valueNotEmpty,
                                ]}
                                feedbackMessages={[
                                    "Champ obligatoire."
                                ]}
                                onChange={onPriceChanged}
                            />
                        </Col>
                    </Row>
                    <Row
                        lg="4"
                        md="2"
                        sm="2"
                    >
                        <Col>
                            <FormGroup>
                                <Label for="categories">Catégorie :</Label>
                                <Input type="select" name="selectCategory" id="selectCategory" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} disabled={categories.length === 0}>
                                    <option value={null}>Sélection</option>
                                    {categories.map((category, id) => (
                                        <option key={id} value={category}>{category}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="genders">Genre :</Label>
                                <Input type="select" name="selectGender" id="selectGender" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} disabled={genders.length === 0}>
                                    <option value={null}>Sélection</option>
                                    {genders.map((gender, id) => (
                                        <option key={id} value={gender}>{gender}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="sizes">Taille :</Label>
                                <Input type="select" name="selectSize" id="selectSize" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} disabled={sizes.length === 0}>
                                    <option value={null}>Sélection</option>
                                    {sizes.map((size, id) => (
                                        <option key={id} value={size}>{size}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <Label for="stars">
                                État :
                            </Label>
                            <StarRatings
                                rating={rate}
                                starRatedColor="gold"
                                starHoverColor="gold"
                                changeRating={setRate} // Utilise handleStarClick pour mettre à jour la valeur
                                numberOfStars={5}
                                starDimension="25px"
                                starSpacing="1px"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
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
                        <Col>
                            <Button
                                color={"primary"}
                                onClick={onSubmit}
                                disabled={!isFormValid}
                            >
                                Ajouter l'article
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </Container >
    );
}

export default AddProduct;