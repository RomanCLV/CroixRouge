import React, {useState} from "react";
import "../styles/Account.css";
import {
    Button, Card,
    Col,
    Container, Modal, ModalBody, ModalFooter, ModalHeader, Row
} from "reactstrap";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../store/slices/userSlice";
import ImagesSelector from "../components/ImagesSelector";

const Account = () => {

    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const [modal, setModal] = useState(false);
    const [updatePicture, setUpdatePicture] = useState(false);
    const [newUrl, setNewUrl] = useState("");

    const onLogoutClick = () => {
        localStorage.removeItem("jwt");
        dispatch(logout());
    };

    const toggle = () => setModal(!modal);

    const defaultImagePath = process.env.PUBLIC_URL + "/assets/images/default.png";

    const urlsChanged = (urls) => {
        const url = urls.length === 0 ? "" : urls[0];
        console.log("updated:", url)
        setNewUrl(url)
    }

    const onValidate = () => {
        console.log("validate")
        setUpdatePicture(false);
    }

    const onCancel = () => {
        console.log("cancel")
        setUpdatePicture(false);
    }

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
            <Row className={"mainContentView margin-top-10vh"}>
                <Col xs={updatePicture ? 5 : 3}>
                    <Row>
                    {
                        updatePicture ?
                        <ImagesSelector multiSelection={false} onUrlsChanged={urlsChanged} /> :
                        <Card className={"border-0"}>
                            <img src={(user.imagePath ? user.imagePath : defaultImagePath)} alt={"avatar"} />
                        </Card>
                    }
                    </Row>
                    <Row>
                        <div className="margin-top-10vh" />
                    </Row>
                    <Row>
                        {
                            updatePicture ?
                            <Row>
                                <Col>
                                    <Button 
                                        onClick={onValidate}
                                        disabled={newUrl.length === 0} 
                                        color="primary">
                                        Valider
                                    </Button>
                                </Col>
                                <Col>
                                    <Button 
                                        onClick={onCancel}>
                                        Annuler
                                    </Button>
                                </Col>
                            </Row>
                            :  
                            <Button onClick={() => setUpdatePicture(true)}>
                                Edit
                            </Button>
                        }
                    </Row>
                </Col>
                <Col xs={{
                    size: updatePicture ? 6 : 8,
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
