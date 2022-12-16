import React, {useEffect, useState} from "react";
import "../styles/PasswordReset.css";
import {
    Button,
    Container,
    Form, Row
} from "reactstrap";
import {Link} from "react-router-dom";
import {ROUTES} from "../router/routes";
import {useSelector} from "react-redux";
import {isConnected} from "../store/slices/userSlice";
import InputManager from "../components/InputManager";

const PasswordReset = () => {

    const connected = useSelector(isConnected);

    const [emailSent, setEmailSent] = useState(false);

    const [email, setEmail] = useState("");

    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        const valid = valueNotEmpty(email) &&
            validateEmail(email);
        if (valid !== isFormValid) {
            setIsFormValid(valid);
        }
    }, [email, isFormValid]);

    const valueNotEmpty = (value) => {
        return value.length !== 0;
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null;
    };

    const onEmailChanged = (value) => {
        setEmail(value);
    }

    const onSubmit = () => {
        const valid = valueNotEmpty(email) &&
            validateEmail(email);
        if (!valid) {
            setErrorMessage("Veuillez saisir tous les champs obligatoires.");
            return;
        }
        if (!validateEmail(email)) {
            setErrorMessage("Veuillez saisir un email valide.");
            return;
        }
        setEmailSent(true);
    }

    return (
        <Container className={"login-container"}>
            <h2>Mot de passe oublié</h2>
            {
                emailSent ?
                    <>
                        <p>Si un compte est associé à l'email désigné, vous recevrez un mail d'ici quelques instants.</p>
                    </>
                    :
                    <Form className={"margin-top-10vh"}>
                        {
                            errorMessage && <p className={"errorElement"}>{errorMessage}</p>
                        }
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
                                "Veuillez saisir un email valide."
                            ]}
                            onChange={onEmailChanged}
                        />
                        {' '}
                        <Button
                            color={"primary"}
                            onClick={onSubmit}
                            disabled={!isFormValid}
                        >
                            Envoyer
                        </Button>
                    </Form>
            }
            {
                !connected &&
                <div>
                    <Row className={"margin-top-20px"}>
                        <Link to={ROUTES.login}>
                            Se connecter
                        </Link>
                    </Row>
                    <Row className={"margin-top-20px"}>

                        <Link to={ROUTES.signup}>
                            S'inscrire
                        </Link>
                    </Row>
                </div>
            }
        </Container>
    );
}

export default PasswordReset;
