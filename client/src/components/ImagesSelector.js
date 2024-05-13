import {useState} from "react";
import {Container, Row, Col, UncontrolledCarousel, Table, Button} from "reactstrap";
import InputManager from "./InputManager";
import "../styles/index.css";

function ImagesSelector(props) {
    const [urls, setUrls] = useState([]);
    const [newUrl, setNewUrl] = useState("");
    const multiSelection = props.multiSelection || false;

    const addUrl = () => {
        if (newUrl.length !== 0) {
            let newUrls = [...urls];
            newUrls.push(newUrl);
            setUrls(newUrls);
            setNewUrl("");
            if (props.onUrlsChanged) {
                props.onUrlsChanged(newUrls);
            }
        }
    }

    const deleteUrl = (index) => {
        let newUrls = [...urls];
        newUrls.splice(index, 1);
        setUrls(newUrls);
        if (props.onUrlsChanged) {
            props.onUrlsChanged(newUrls);
        }
    }

    return (
        <Container>
            {
                urls.length === 0 ?
                <Row>No images loaded</Row> :
                <Row>
                    <UncontrolledCarousel
                        dark
                        items={urls.map((url, index) => {
                            return {
                                altText: url,
                                caption: "",
                                key: index,
                                src: url
                            };
                        })}
                    />
                </Row>
            }
            <Row>
                <Col>
                    <Table striped>
                    <thead>
                        <tr>
                            <th>
                                URL
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            urls.map((url, id) => 
                                <tr key={id}>
                                    <td>
                                        {url}
                                    </td>
                                    <td>
                                        <Button onClick={() => deleteUrl(id)} color="danger">
                                            Supprimer
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                         <tr>
                            <td>
                                <InputManager
                                    id={"input"}
                                    name={"input"}
                                    label={"URL"}
                                    placeholder={"URL"}
                                    type={null}
                                    required={true}
                                    value={newUrl}
                                    onChange={setNewUrl}
                                />
                            </td>
                            <td>
                                <Button 
                                    disabled={newUrl.length === 0 || (urls.length !== 0 && !multiSelection)} 
                                    onClick={addUrl} 
                                    color="primary">
                                    Ajouter
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
}

export default ImagesSelector;