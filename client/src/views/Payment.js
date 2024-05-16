import React, {useEffect, useState} from "react";
import "../styles/Payment.css";
import {
    Button,
    Col,
    Container,
    Form,
    Row
} from "reactstrap";
import CartStatement from "../components/CartStatement";
import {ROUTES} from "../router/routes";
import {useNavigate} from "react-router-dom";
import InputManager from "../components/InputManager";
import { pay } from "../services/productsService";
import {useDispatch, useSelector} from "react-redux";
import {clearProducts, selectProducts} from "../store/slices/productsSlice";
import {clearCommand, selectCommand, setCommand} from "../store/slices/commandSlice";

const Payment = () => {

    const navigate = useNavigate();
    const products = useSelector(selectProducts);
    const command = useSelector(selectCommand);
    const dispatch = useDispatch();

    const [carte, setCarte] = useState("");
    const [expirationDate, setExpirationDate] = useState("");
    const [codeCarte, setCodeCarte] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");

    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (command) {
            dispatch(clearCommand())
        }
        const valid =
            valueNotEmpty(carte) &&
            valueNotEmpty(expirationDate) &&
            valueNotEmpty(codeCarte) &&
            valueNotEmpty(name) &&
            valueNotEmpty(surname) &&
            validateCart(carte) &&
            validateExpirationDate(expirationDate) &&
            validateCode(codeCarte);

        if (valid !== isFormValid) {
            setIsFormValid(valid);
        }
    }, [command, dispatch, carte, expirationDate, codeCarte, name, surname, isFormValid]);

    const valueNotEmpty = (value) => value.length !== 0;

    const validateCart = (carte) => {
        return carte.match(/^[0-9]{16}$/) !== null;
    }

    const validateExpirationDate = (date) => {
        return date.match(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/) !== null;
    }

    const validateCode = (code) => {
        return code.match(/^[0-9]{3}$/) !== null;
    }

    const onBackClick = () => {
        navigate(ROUTES.cart);
    }

    const onSubmit = async () => {
        const valid =
            valueNotEmpty(carte) &&
            valueNotEmpty(expirationDate) &&
            valueNotEmpty(codeCarte) &&
            valueNotEmpty(name);

        if (!valid) {
            setErrorMessage("Veuillez saisir tous les champs obligatoires.");
            return;
        }
        if (!validateCart(carte)) {
            setErrorMessage("Carte non valide.");
            return;
        }
        if (!validateExpirationDate(expirationDate)) {
            setErrorMessage("Date non valide.");
            return;
        }
        if (!validateCode(codeCarte)) {
            setErrorMessage("Code non valide.");
            return;
        }

        const result = await pay(products.map(product => product.id));
        console.log("pay result:", result)
        if (result.products) {
            dispatch(clearProducts());
            dispatch(setCommand(result.products));
            navigate(ROUTES.paymentDone);
        }
        else {
            setErrorMessage(result.error);
        }
    }

    const onCarteChanged = (value) => {
        setCarte(value);
    }

    const onCodeChanged = (value) => {
        setCodeCarte(value);
    }

    const onExpirationDateChanged = (value) => {
        setExpirationDate(value);
    }

    const onNameChanged = (value) => {
        setName(value);
    }

    const onSurnameChanged = (value) => {
        setSurname(value);
    }

    return (
        <Container>
            <CartStatement step={1} />
            {
                errorMessage && <p className={"errorElement"}>{errorMessage}</p>
            }
            <Form className={"form-Payment margin-bottom-10vh"}>
                <Row>
                    <Col xs={12} md={5}>
                        <p>Numéro de carte</p>
                        <InputManager
                            id={"inputCarte"}
                            name={"inputCarte"}
                            label={"0123 4567 8901 2345"}
                            placeholder={"0123 4567 8901 2345"}
                            type={null}
                            required={true}
                            value={carte}
                            validators={[
                                valueNotEmpty,
                                validateCart
                            ]}
                            feedbackMessages={[
                                "Champ obligatoire.",
                                "Carte non valide."
                            ]}
                            onChange={onCarteChanged}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={3} xs={6} >
                        <p>Date</p>
                        <InputManager
                            id={"inputDateCarte"}
                            name={"inputDateCarte"}
                            label={"MM/YY"}
                            placeholder={"MM / YY"}
                            type={null}
                            required={true}
                            value={expirationDate}
                            validators={[
                                valueNotEmpty,
                                validateExpirationDate
                            ]}
                            feedbackMessages={[
                                "Champ obligatoire.",
                                "Date d'expiration non valide."
                            ]}
                            onChange={onExpirationDateChanged}
                        />
                    </Col>
                    <Col md={3} xs={6}>
                        <p>Code</p>
                        <InputManager
                            id={"inputCodeCarte"}
                            name={"inputCodeCarte"}
                            label={"XXX"}
                            placeholder={"MM / YY"}
                            type={null}
                            required={true}
                            value={codeCarte}
                            validators={[
                                valueNotEmpty,
                                validateCode
                            ]}
                            feedbackMessages={[
                                "Champ obligatoire.",
                                "Code non valide."
                            ]}
                            onChange={onCodeChanged}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={4} xs={6} >
                        <p>Prénom</p>
                        <InputManager
                            id={"inputName"}
                            name={"inputName"}
                            label={"Prénom"}
                            placeholder={"Prénom"}
                            type={null}
                            required={true}
                            value={name}
                            validators={[
                                valueNotEmpty
                            ]}
                            feedbackMessages={[
                                "Champ obligatoire.",
                            ]}
                            onChange={onNameChanged}
                        />
                    </Col>
                    <Col md={4} xs={6}>
                        <p>Nom</p>
                        <InputManager
                            id={"inputSurname"}
                            name={"inputSurname"}
                            label={"Nom"}
                            placeholder={"Nom"}
                            type={null}
                            required={true}
                            value={surname}
                            validators={[
                                valueNotEmpty
                            ]}
                            feedbackMessages={[
                                "Champ obligatoire.",
                            ]}
                            onChange={onSurnameChanged}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col xs={2}>
                        <Button
                            onClick={onBackClick}
                            className={"bg-primary-red border-0 fw-semibold"}
                        >
                            Retour
                        </Button>
                    </Col>
                    <Col xs={{size: 2, offset: 7}}>
                        <Button
                            onClick={onSubmit}
                            className={"bg-primary-red border-0 fw-semibold"}
                            disabled={!isFormValid}
                        >
                            Payer
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default Payment;
