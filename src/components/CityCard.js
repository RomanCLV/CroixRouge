import React from "react";
import {Card, CardBody, CardImg, CardSubtitle, CardTitle} from "reactstrap";
import {ROUTES} from "../router/routes";
import {useNavigate} from "react-router-dom";

const CityCard = (props) => {

    const city = props.city;

    const navigate = useNavigate();

    const onCitiesButtonClick = () => {
        navigate(ROUTES.city + "/" + city.name);
    }

    return (
        <Card
            onClick={onCitiesButtonClick}
            color="light"
            className={"CityCard"}
        >
            <CardImg
                alt={"img_" + city.name}
                src={city.image}
                top
                width="100%"
            />
            <CardBody>
                <CardTitle tag="h5">
                    {city.name}
                </CardTitle>
                <CardSubtitle
                    className="mb-2 text-muted"
                    tag="h6"
                >
                    {city.address}
                </CardSubtitle>
            </CardBody>
        </Card>
    )
}
export default CityCard;
