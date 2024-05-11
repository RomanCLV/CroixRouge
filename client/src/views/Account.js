import React, {useState} from "react";
import "../styles/Account.css";
import {
    Button, Card,
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
        localStorage.removeItem("jwt");
        dispatch(logout());
    };

    const toggle = () => setModal(!modal);

    return (
        <Container className={"margin-top-10vh"}>
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
                <h2>Informations du compte</h2>
            </Row>
            <Row className={"mainContentView"}>
                <Col xs={3}>
                    <Card className={"border-0"}>
                        <img src={user.avatar} alt={"avatar"} />
                    </Card>
                </Col>
                <Col xs={{
                    size: 8,
                    offset: 1
                }}>
                    <p>Nom d'utilisateur : {user.username}</p>
                    <p>Email : {user.email}</p>
                    <Button onClick={toggle} color={"danger"} className={"margin-top-10vh"}>
                        Se déconnecter
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default Account;
