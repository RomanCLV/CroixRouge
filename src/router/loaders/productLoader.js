import {getProductById} from "../../data/data";

export async function productLoader ({params}) {
    const product = getProductById(params.id);
    if (product) {
        return product;
    }
    return null;
}
