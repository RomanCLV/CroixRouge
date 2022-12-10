import { v4 } from "uuid";

const CityModel = props => {
    return {
        id: v4(),
        name: props.name || "",
        address: props.address || "",
        image: props.image || "",
        products: []
    };
}

export default CityModel;