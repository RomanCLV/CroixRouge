import React, {useEffect, useState, useCallback} from "react";
import "../styles/Login.css";
import {
    Button,
    Container,
    Form, Row,
} from "reactstrap";
import {auth, status} from "../services/authService"
import {useDispatch, useSelector} from "react-redux";
import {setUser} from "../store/slices/userSlice";
import {Link} from "react-router-dom";
import {ROUTES} from "../router/routes";
import InputManager from "../components/InputManager";
import {clearToast, setToast} from "../store/slices/toastSlice";
import { addProduct, selectProducts } from "../store/slices/productsSlice";
import { createCart, getCarts } from "../services/cartsService";

const Login = () => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const currentCart = useSelector(selectProducts);

    const successAuth = useCallback((user) => {
        dispatch(setUser(user));
        dispatch(setToast({
            type: "success",
            title: "Connexion réussie",
            message: "Heureux de vous revoir " + user.username + " !"
        }));
        setTimeout(() => {
            dispatch(clearToast());
        }, 3000);
    }, [dispatch]);

    useEffect(() => {
        const currentJWT = localStorage.getItem('jwt');
        if (currentJWT) {
            const fetchStatus = async () => {
                const result = await status(currentJWT);
                if (result.error) {
                    localStorage.removeItem("jwt");
                }
                else {
                    localStorage.setItem('jwt', result.jwt)
                    successAuth(result.user);
                }
            };
            fetchStatus();
        }
        
        const isValid = valueNotEmpty(username) && validateEmail(username) && valueNotEmpty(password);
        if (isValid !== isFormValid) {
            setIsFormValid(isValid);
        }

    }, [username, password, isFormValid, successAuth]);

    const valueNotEmpty = (value) => value.length !== 0;

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null;
    };

    const onUsernameChanged = (value) => {
        setUsername(value);
    }

    const onPasswordChanged = (value) => {
        setPassword(value);
    }

    const onSubmit = async () => {
        if (!isFormValid) {
            setErrorMessage("Veuillez saisir tous les champs obligatoires.");
            return;
        }

        const result = await auth(username, password);
        if (result.error) {
            setErrorMessage(result.error.message);
            setPassword("");
        }
        else {
            const result2 = await status(result.jwt);
            localStorage.setItem("jwt", result2.jwt);
            // fusion du panier local et du panier de la bdd
            const cart = await getCarts(result2.jwt);
            for (let i = 0; i < currentCart.length; i++) {
                if (!cart.products.find(p => p ? p.id === currentCart[i].id : true)) {
                    await createCart(result2.jwt, currentCart[i].id)
                }
            }
            // ajout des produits du panier de la bdd dans le panier local
            if (cart.products) {
                cart.products.forEach(product => dispatch(addProduct(product)))
            }
            successAuth(result2.user);
        }
    }

    return (
        <Container className={"login-container"}>
            <h2>Connexion</h2>
            <Form className={"margin-top-10vh"}>
                {
                    errorMessage && <p className={"errorElement"}>{errorMessage}</p>
                }
                <InputManager
                    id={"inputUsername"}
                    name={"username"}
                    label={"Email"}
                    placeholder={"Email"}
                    type={null}
                    required={true}
                    value={username}
                    validators={[
                        valueNotEmpty,
                        validateEmail
                    ]}
                    feedbackMessages={[
                        "Champ obligatoire.",
                        "Veuillez saisir un email valide.",
                    ]}
                    onChange={onUsernameChanged}
                />
                {' '}
                <InputManager
                    id={"inputPassword"}
                    name={"password"}
                    label={"Mot de passe"}
                    placeholder={"Mot de passe"}
                    type={"password"}
                    required={true}
                    value={password}
                    validators={[
                        valueNotEmpty
                    ]}
                    feedbackMessages={[
                        "Champ obligatoire.",
                    ]}
                    onChange={onPasswordChanged}
                />
                {' '}
                <Button
                    color={"primary"}
                    onClick={onSubmit}
                    disabled={!isFormValid}
                >
                    Se connecter
                </Button>
            </Form>
            <Row className={"margin-top-20px"}>
                <Link to={ROUTES.passwordReset}>
                    Mot de passe oublié
                </Link>
            </Row>
            <Row className={"margin-top-20px"}>
                <Link to={ROUTES.signup}>
                    Je n'ai pas de compte
                </Link>
            </Row>
        </Container>
    );
}

export default Login;
