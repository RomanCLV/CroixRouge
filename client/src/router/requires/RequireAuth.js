import { Navigate } from "react-router-dom";
import { ROUTES } from "../routes";
import { status } from "../../services/authService";

const RequireAuth = async ( { children } ) => {

    const currentJWT = localStorage.getItem('jwt');
    if (currentJWT) {
        const result = await status(currentJWT);
        if (result.error) {
            return <Navigate to={ROUTES.login} />
        }
    }
    else {
        return <Navigate to={ROUTES.login} />
    }
    return children;
};

export default RequireAuth;
