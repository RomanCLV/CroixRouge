import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isCitySelected } from "../../store/slices/citySlice";
import { ROUTES } from "../routes";

const RequireCity = ( { children } ) => {

    const citySelected = useSelector(isCitySelected);
    if (!citySelected) {
        return <Navigate to={ROUTES.cities} />
    }
    return children;
};

export default RequireCity;
