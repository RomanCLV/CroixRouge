import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import InputManager from "../components/InputManager";
import ImagesSelector from '../components/ImagesSelector';
import { selectCity } from '../store/slices/citySlice';
import { ROUTES } from "../router/routes";
import { addProduct } from "../services/productsService";
import { getGenders } from "../services/gendersService";
import { getCategories } from "../services/categoriesService";
import { getSizes } from "../services/sizesService";

function AddProduct() {
    const navigate = useNavigate();
    const city = useSelector(selectCity);

    const [firstFetch, setFirstFetch] = useState(true);
    const [sizes, setSizes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [genders, setGenders] = useState([]);

    const [title, setTitle] = useState("");
    const [urls, setUrls] = useState([]);
    const [price, setPrice] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [rate, setRate] = useState(3);
    const [description, setDescription] = useState("");

    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const fetchCategories = useCallback(async () => {
        const response = await getCategories();
        if (response.error) {
            setErrorMessage(response.error.message);
        }
        else {
            setCategories(response.categories);
        }
    }, []);

    const fetchGenders = useCallback(async () => {
        const response = await getGenders();
        if (response.error) {
            setErrorMessage(response.error.message);
        }
        else {
            setGenders(response.genders);
        }
    }, []);

    const fetchSizes = useCallback(async () => {
        const response = await getSizes();
        if (response.error) {
            setErrorMessage(response.error.message);
        }
        else {
            setSizes(response.sizes);
        }
    }, []);

    useEffect(() => {
        const valid =
            valueNotEmpty(title) &&
            valueNotEmpty(price) &&
            valueNotEmpty(selectedCategory) &&
            valueNotEmpty(selectedGender) &&
            valueNotEmpty(selectedSize) &&
            valueNotEmpty(description) &&
            urls.length > 0 &&
            valueNotEmpty(city.name);

        if (valid !== isFormValid) {
            setIsFormValid(valid);
        }
        if (valid && valueNotEmpty(errorMessage)) {
            setErrorMessage("");
        }

        if (firstFetch) {
            setFirstFetch(false);
            fetchCategories();
            fetchGenders();
            fetchSizes();
        }

    }, [title, price, selectedCategory, selectedGender, selectedSize, description, isFormValid, firstFetch, city.name, errorMessage, urls.length, fetchCategories, fetchGenders, fetchSizes]);

    const valueNotEmpty = (value) => value.length !== 0;

    const onTitleChanged = (value) => setTitle(value);
    const onPriceChanged = (value) => setPrice(parseFloat(value));
    const onDescriptionChanged = (value) => setDescription(value);

    const createProductData = () => {
        return {
            title: title,
            price: price,
            description: description,
            city: city.name,
            size: selectedSize,
            gender: selectedGender,
            category: selectedCategory,
            state: rate,
            images: urls
        };
    };

    const onSubmit = async () => {
        const productData = createProductData();
        if (!isFormValid) {
            setErrorMessage("Veuillez saisir tous les champs obligatoires.");
            return;
        }

        const result = await addProduct(productData);
        if (result.error) {
            setErrorMessage(result.error.message);
        }
        else {
            navigate(ROUTES.root);
        }
    };

    const imageChanged = (urls) => {
        setUrls(urls);
        if (urls.length === 0) {
            setErrorMessage("Charger au moins une image.")
        }
    }

    return (
        <Container className={"margin-top-10vh margin-bottom-10vh"}>
            <Row >
                <h2>Ajout d'un produit à {city.name}</h2>
            </Row>
            <Row>
                {
                    errorMessage && <p className={"errorElement"}>{errorMessage}</p>
                }
            </Row>
            <Row className={"margin-top-10vh"}>
                <Col md={6}>
                    <ImagesSelector onUrlsChanged={imageChanged} />
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
                                    <option value={""}>Sélection</option>
                                    {categories.map((category, id) => <option key={id} value={category}>{category}</option>)}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="genders">Genre :</Label>
                                <Input type="select" name="selectGender" id="selectGender" value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)} disabled={genders.length === 0}>
                                    <option value={""}>Sélection</option>
                                    {genders.map((gender, id) => <option key={id} value={gender}>{gender}</option>)}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label for="sizes">Taille :</Label>
                                <Input type="select" name="selectSize" id="selectSize" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)} disabled={sizes.length === 0}>
                                    <option value={""}>Sélection</option>
                                    {sizes.map((size, id) => <option key={id} value={size}>{size}</option>)}
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