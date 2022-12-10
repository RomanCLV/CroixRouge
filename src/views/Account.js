import React, {useState} from "react";
import "../styles/Account.css";
import {
    Button,
    Col,
    Container, Modal, ModalBody, ModalFooter, ModalHeader, Row
} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../store/slices/userSlice";

const Account = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);

    const onLogoutClick = () => {
        dispatch(logout());
    };

    const toggle = () => setModal(!modal);

    return (
        <Container>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Déconnexion</ModalHeader>
                <ModalBody>
                    Êtes-vous sûr de vouloir vous déconnecter ?
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>
                        Annuler
                    </Button>
                    {' '}
                    <Button color="danger" onClick={onLogoutClick}>
                        Se déconnecter
                    </Button>
                </ModalFooter>
            </Modal>
            <Row>
                <Col>
                    <h2>Informations du compte</h2>
                    <p>Nom d'utilisateur : {user.username}</p>
                    <p>Email : {user.email}</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button onClick={toggle} color={"danger"}>
                        Se déconnecter
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Account;
