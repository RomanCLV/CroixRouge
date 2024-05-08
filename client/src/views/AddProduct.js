import { Container, Row, Col, FormGroup, Label, Input, InputGroup, InputGroupText, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, Dropdown } from 'reactstrap';
import StarRating from '../components/StarRating';
import { useState, useEffect } from 'react';
// import CarouselView from './Carousel';

function AddProduct() {
    const [categories, setCategories] = useState([]);
    const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);

    const toggleCategories = () => setCategoriesDropdownOpen((prevState) => !prevState);

    useEffect(() => {
        const fetchData = async () => {
            await fetch("http://localhost:3000/categories")
                .then(res => res.json())
                .then(data => {
                    setCategories(data.categories);
                })
                .catch(error => {
                    console.log(error)
                })
        };
        fetchData();
    }, [setCategories]);

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
                            <FormGroup>
                                <Label for="title">
                                    Titre :
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Titre de l'annonce"
                                    type="title"
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6} style={{ background: "purple" }} >
                            <FormGroup>
                                <Label for="price">
                                    Prix :
                                </Label>
                                <InputGroup>
                                    <Input
                                        id="price"
                                        name="price"
                                        placeholder="Prix de l'annonce"
                                        type="price"
                                    />
                                    <InputGroupText>€</InputGroupText>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row
                        lg="4"
                        md="2"
                        sm="2"
                    >
                        <Col style={{ background: "#DD7777" }} >
                            <FormGroup>
                                <Label for="categories">
                                    Catégorie :
                                </Label>
                                <InputGroup>
                                    <Dropdown
                                        isOpen={categoriesDropdownOpen}
                                        toggle={toggleCategories}
                                        disabled={categories.length === 0}
                                    >
                                        <DropdownToggle caret color="primary">Catégories</DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                categories.map((category, id) => <DropdownItem key={id}>{category}</DropdownItem>)
                                            }
                                        </DropdownMenu>
                                    </Dropdown>
                                    {/* <Dropdown>
                                        <DropdownToggle
                                            caret
                                            color="primary"
                                        >
                                            Catégories
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            {
                                                categories.map((category, id) => <DropdownItem key={id}>{category}</DropdownItem>)
                                            }
                                        </DropdownMenu>
                                    </Dropdown> */}
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col style={{ background: "yellow" }} >
                            <FormGroup>
                                <Label for="genres">
                                    Genre :
                                </Label>
                                <InputGroup>
                                    <UncontrolledDropdown group>
                                        <DropdownToggle
                                            caret
                                            color="primary"
                                        >
                                            Genres</DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>
                                                Foo Action
                                            </DropdownItem>
                                            <DropdownItem>
                                                Bar Action
                                            </DropdownItem>
                                            <DropdownItem>
                                                Quo Action
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col style={{ background: "#24BDDF" }} >
                            <FormGroup>
                                <Label for="sizes">
                                    Taille :
                                </Label>
                                <InputGroup>
                                    <UncontrolledDropdown group>
                                        <DropdownToggle
                                            caret
                                            color="primary"
                                        >
                                            Tailles</DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem>
                                                Foo Action
                                            </DropdownItem>
                                            <DropdownItem>
                                                Bar Action
                                            </DropdownItem>
                                            <DropdownItem>
                                                Quo Action
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col style={{ background: "white" }} >
                            <Label for="stars">
                                Etat :
                            </Label>
                            <StarRating rating={5} />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ background: "#EEBEE3" }}>
                            <FormGroup>
                                <Label for="description">
                                    Description :
                                </Label>
                                <Input
                                    id="description"
                                    name="description"
                                    placeholder="Description de l'annonce"
                                    type="textarea"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ background: "#DD7777" }} >
                            <Button
                                color="primary"
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