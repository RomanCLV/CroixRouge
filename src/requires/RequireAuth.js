import { useSelector } from "react-redux";
import { isConnected } from "../store/storeSlice";
import {Navigate} from "react-router-dom";

const RequireAuth = ( { children } ) => {

    const connected = useSelector(isConnected);

    if (!connected) {
        return <Navigate to={"/login"} />
    }
    return children;
}

export default RequireAuth;
