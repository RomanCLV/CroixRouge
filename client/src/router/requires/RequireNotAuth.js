import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { isConnected } from "../../store/slices/userSlice";
import { ROUTES } from "../routes";

const RequireNotAuth = ( { children } ) => {

    const connected = useSelector(isConnected);
    console.log("connected:", connected)
    if (connected) {
        console.log("redirection")
        return <Navigate to={ROUTES.root} />
    }
    console.log("children")
    return children;
};

export default RequireNotAuth;
