import { useSelector } from "react-redux";
import { isConnected } from "../store/storeSlice";
import { Navigate } from "react-router-dom";

const RequireNotAuth = ( { children } ) => {

    const connected = useSelector(isConnected);
    if (connected) {
        return <Navigate to={"/"} />
    }
    return children;
}

export default RequireNotAuth;
