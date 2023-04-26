import { isExpired, decodeToken } from "react-jwt";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
const AuthWrapper = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user ? user.token : null;
    const tokenExpired = isExpired(token);

    //khai bao hook logout
    const {logout} = useLogout();

    if(tokenExpired){
        logout();
        alert("Your session is expired, please login again");
        return (
            <Navigate to="/sign-in" replace />
        )
    }else if (!tokenExpired){
        return (
            <Outlet />
        );
    }
}
 
export default AuthWrapper;