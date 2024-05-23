import React, {useEffect, useState} from "react";
import "../styles/Signup.css";
import {
    Button,
    Container, Form, Row
} from "reactstrap";
import InputManager from "../components/InputManager";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../router/routes";
import {signup, canRegister} from "../services/signupService";

const Signup = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        const valid = valueNotEmpty(username) &&
            valueNotEmpty(email) &&
            valueNotEmpty(password) &&
            validateEmail(email);
        if (valid !== isFormValid) {
            setIsFormValid(valid);
        }
    }, [username, email, password, isFormValid]);

    const valueNotEmpty = (value) => value.length !== 0;

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null;
    };

    const isEmailFree = async (email) => {
        const result = await canRegister(email);
        if (result) {
            if (result.error) {
                setErrorMessage(result.error.message);
            }
            else {
                return result ? result.value : true;
            }
        }
        return false;
    }

    const onEmailChanged = async (value) => {
        setEmail(value);
        if (validateEmail(value)) {
            if (await isEmailFree(value)) {
                setErrorMessage("");
            }
            else {
                setErrorMessage("Email déjà utilisé.");
            }
        }
    }

    const onUsernameChanged = (value) => {
        setUsername(value);
    }

    const onPasswordChanged = (value) => {
        setPassword(value);
    }

    const onSubmit = async () => {
        const valid = valueNotEmpty(username) &&
            valueNotEmpty(email) &&
            valueNotEmpty(password);
        if (!valid) {
            setErrorMessage("Veuillez saisir tous les champs obligatoires.");
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage("Veuillez saisir un email valide.");
            return;
        }
        if (!await isEmailFree(email)) {
            setErrorMessage("Cette adresse email est déjà utilisée.");
            return;
        }

        const result = await signup(username, email, password);
        if (result.error) {
            setErrorMessage(result.error.message);
        }
        else {
            localStorage.setItem('jwt', result.jwt);
            navigate(ROUTES.login);
        }
    }

    return (
        <Container className={"login-container"}>
            <h2>Inscription</h2>
            <Form className={"margin-top-10vh"}>
                {
                    errorMessage && <p className={"errorElement"}>{errorMessage}</p>
                }
                <InputManager
                    id={"inputUsername"}
                    name={"username"}
                    label={"Nom d'utilisateur"}
                    placeholder={"Nom d'utilisateur"}
                    type={null}
                    required={true}
                    value={username}
                    validators={[
                        valueNotEmpty
                    ]}
                    feedbackMessages={[
                        "Champ obligatoire."
                    ]}
                    onChange={onUsernameChanged}
                />
                {' '}
                <InputManager
                    id={"inputEmail"}
                    name={"email"}
                    label={"Email"}
                    placeholder={"Email"}
                    type={"email"}
                    required={true}
                    value={email}
                    validators={[
                        valueNotEmpty,
                        validateEmail
                    ]}
                    feedbackMessages={[
                        "Champ obligatoire.",
                        "Veuillez saisir un email valide.",
                    ]}
                    onChange={onEmailChanged}
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
                    S'inscrire
                </Button>
            </Form>
            <Row className={"margin-top-20px"}>
                <Link to={ROUTES.login}>
                    J'ai déjà un compte
                </Link>
            </Row>
        </Container>
    );
}

export default Signup;
