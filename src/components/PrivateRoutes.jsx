import {Navigate, Outlet, useLocation} from "react-router-dom";


export default function PrivateRoutes(){
    const location = useLocation();
    let authLogin = window.localStorage.getItem('token') !== null;
    if (authLogin === undefined || location.pathname === '/') {
        authLogin = false;
    }

    return authLogin
        ? <Outlet />
        : <Navigate to="/login" replace state={{ from: location }} />;
}