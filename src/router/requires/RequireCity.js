import { useSelector } from "react-redux";
import { isCitySelected } from "../../store/storeSlice";
import { Navigate } from "react-router-dom";
import {ROUTES} from "../routes";

const RequireCity = ( { children } ) => {

    const citySelected = useSelector(isCitySelected);

    if (!citySelected) {
        return <Navigate to={ROUTES.cities} />
    }
    return children;
}

export default RequireCity;
