import React, {useEffect, useState} from "react";
import "../styles/Login.css";
import {
    Button,
    Container,
    Form,
} from "reactstrap";
import {login} from "../data/data";
import {useDispatch} from "react-redux";
import {setUser} from "../store/slices/userSlice";
import {Link} from "react-router-dom";
import {ROUTES} from "../router/routes";
import InputManager from "../components/InputManager";
import {clearToast, setToast} from "../store/slices/toastSlice";

const Login = () => {

    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        const isValid = valueNotEmpty(username) &&
            valueNotEmpty(password);
        if (isValid !== isFormValid) {
            setIsFormValid(isValid);
        }

    }, [username, password, isFormValid]);

    const valueNotEmpty = (value) => value.length !== 0;

    const onUsernameChanged = (value) => {
        setUsername(value);
    }

    const onPasswordChanged = (value) => {
        setPassword(value);
    }

    const onSubmit = () => {
        if (!isFormValid) {
            setErrorMessage("Veuillez saisir tous les champs obligatoires.");
            return;
        }

        const user = login({
            username: username,
            password: password
        });
        if (user.error) {
            setErrorMessage(user.error);
            setPassword("");
        }
        else {
            dispatch(setUser(user));
            dispatch(setToast({
                type: "success",
                title: "Connexion réussie",
                message: "Heureux de vous revoir " + user.username + " !"
            }));
            setTimeout(() => {
                dispatch(clearToast());
            }, 3000);
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
                    label={"Email ou nom d'utilisateur"}
                    placeholder={"Email ou nom d'utilisateur"}
                    type={null}
                    required={true}
                    value={username}
                    validators={[
                        valueNotEmpty
                    ]}
                    feedbackMessages={[
                        "Champ obligatoire.",
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
            <Link to={ROUTES.passwordReset}>
                Mot de passe oublié
            </Link>
            {' '}
            <Link to={ROUTES.signup}>
                Je n'ai pas de compte
            </Link>
        </Container>
    );
}

export default Login;
