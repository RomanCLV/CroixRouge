import React, {useEffect, useState} from "react";
import "../styles/Signup.css";
import {
    Button,
    Container, Form
} from "reactstrap";
import InputManager from "../components/InputManager";
import {Link, useNavigate} from "react-router-dom";
import {ROUTES} from "../router/routes";
import {getUserByEmail, getUserByUsername, signIn} from "../data/data";

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
            validateEmail(email) &&
            isUsernameFree(username) &&
            isEmailFree(email);
        if (valid !== isFormValid) {
            setIsFormValid(valid);
        }
    }, [username, email, password, isFormValid]);

    const valueNotEmpty = (value) => value.length !== 0;

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const isUsernameFree = (username) => {
        return getUserByUsername(username) == null;
    }

    const isEmailFree = (email) => {
        return getUserByEmail(email) == null;
    }

    const onEmailChanged = (value) => {
        setEmail(value);
    }

    const onUsernameChanged = (value) => {
        setUsername(value);
    }

    const onPasswordChanged = (value) => {
        setPassword(value);
    }

    const onSubmit = () => {
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
        if (!isUsernameFree(username)) {
            setErrorMessage("Ce nom d'utilsateur est déjà utilisé.");
            return;
        }
        if (!isEmailFree(email)) {
            setErrorMessage("Cette adresse email est déjà utilisée.");
            return;
        }
        const result = signIn({
            username: username,
            email: email,
            password: password
        });
        if (result.success) {
            navigate(ROUTES.login);
        }
        else {
            setErrorMessage(result.error);
        }
    }

    return (
        <Container>
            <Form>
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
                        valueNotEmpty,
                        isUsernameFree
                    ]}
                    feedbackMessages={[
                        "Champ obligatoire.",
                        "Nom déjà utilisé."
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
                        validateEmail,
                        isEmailFree
                    ]}
                    feedbackMessages={[
                        "Champ obligatoire.",
                        "Veuillez saisir un email valide.",
                        "Email déjà utilisé."
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
            {' '}
            <Link to={ROUTES.login}>
                J'ai déjà un compte
            </Link>
        </Container>
    );
}

export default Signup;
