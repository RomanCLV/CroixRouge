import { useSelector } from "react-redux";
import { hasProducts } from "../store/storeSlice";
import { Navigate } from "react-router-dom";

const RequireHasProduct = ( { children } ) => {

    const empty = !useSelector(hasProducts);

    if (empty) {
        return <Navigate to={"/Cart"} />
    }
    return children;
}

export default RequireHasProduct;
