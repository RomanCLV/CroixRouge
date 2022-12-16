import { v4 } from "uuid";

const CityModel = props => {
    const model = {
        id: v4(),
        name: props.name || "",
        address: props.address || "",
        lat: props.lat || 0,
        lng: props.lng || 0,
        image: props.image || "",
    };
    Object.defineProperty(model, 'products', {
        value: [],
        writable: true
    });
    return model;
}

export default CityModel;