import { v4 } from "uuid";

const ProductModel = (props) => {
    return {
        id: v4(),
        cityId: props.cityId || null,
        category: props.category || "",
        name: props.name || "",
        gender: props.gender || "",
        vestingState: props.vestingState || 1,
        description: props.description || "",
        creationDateYear: props.creationDateYear || 1970,
        creationDateMonth: props.creationDateMonth || 0,
        creationDateDay: props.creationDateDay || 1,
        price: props.price || 0.0,
        size: props.size || "",
        images: props.images || []
    };
}

export default ProductModel;
