import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { hasProducts } from "../../store/slices/productListSlice";
import { ROUTES } from "../routes";

const RequireHasProduct = ( { children } ) => {

    const empty = !useSelector(hasProducts);

    if (empty) {
        return <Navigate to={ROUTES.cart} />
    }
    return children;
};

export default RequireHasProduct;
