import { useSelector } from "react-redux";
import { hasProducts } from "../../store/storeSlice";
import { Navigate } from "react-router-dom";
import {ROUTES} from "../routes";

const RequireHasProduct = ( { children } ) => {

    const empty = !useSelector(hasProducts);

    if (empty) {
        return <Navigate to={ROUTES.cart} />
    }
    return children;
}

export default RequireHasProduct;
