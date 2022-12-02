import { useSelector } from "react-redux";
import { isCitySelected } from "../store/storeSlice";
import { Navigate } from "react-router-dom";

const RequireCity = ( { children } ) => {

    const citySelected = useSelector(isCitySelected);

    if (!citySelected) {
        return <Navigate to={"/city"} />
    }
    return children;
}

export default RequireCity;
