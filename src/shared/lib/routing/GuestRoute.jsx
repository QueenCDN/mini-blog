import { useSelector } from "react-redux";
import { selectIsAuth } from "../../../features/auth/model/selectors";
import { Navigate } from "react-router-dom";

export function GuestRoute({ children }) {
    const isAuth = useSelector(selectIsAuth);

    if (isAuth) {
        return <Navigate to={"/"} replace />
    }
    
    return children; 
}