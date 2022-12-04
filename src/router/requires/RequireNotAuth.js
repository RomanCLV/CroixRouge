import { useSelector } from "react-redux";
import { isConnected } from "../../store/storeSlice";
import { Navigate } from "react-router-dom";
import {ROUTES} from "../routes";

const RequireNotAuth = ( { children } ) => {

    const connected = useSelector(isConnected);
    if (connected) {
        return <Navigate to={ROUTES.root} />
    }
    return children;
}

export default RequireNotAuth;
