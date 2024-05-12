import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../routes";
import { isConnected } from "../../store/slices/userSlice";

const RequireAuth = ( { children } ) => {

    const connected = useSelector(isConnected);
    if (!connected || !localStorage.getItem("jwt")) {
        return <Navigate to={ROUTES.login} />
    }

    return children;
};

export default RequireAuth;
