import React from "react";
import {Card, CardBody, CardImg, CardSubtitle, CardTitle} from "reactstrap";
import {ROUTES} from "../router/routes";
import {useNavigate} from "react-router-dom";
import { setCity } from "../store/slices/citySlice";
import { useDispatch } from "react-redux";

const CityCard = (props) => {

    const city = props.city;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onCitiesButtonClick = () => {
        dispatch(setCity(city));
        localStorage.setItem("city", city.name);
        setTimeout(() => {
            navigate(ROUTES.root);
        }, 50);
    }

    return (
        <Card
            onClick={onCitiesButtonClick}
            color="light"
            className={"CityCard"}
        >
            <CardImg
                alt={"img_" + city.name}
                src={city.imagePath}
                top
                width="100%"
                style={{"max-height": '200px'}}
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
