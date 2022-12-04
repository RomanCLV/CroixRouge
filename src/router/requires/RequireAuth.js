import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isConnected } from "../../store/slices/userSlice";
import { ROUTES } from "../routes";

const RequireAuth = ( { children } ) => {

    const connected = useSelector(isConnected);

    if (!connected) {
        return <Navigate to={ROUTES.root} />
    }
    return children;
};

export default RequireAuth;
