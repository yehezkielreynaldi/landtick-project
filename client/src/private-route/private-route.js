import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

// const PrivateRoute = () => {
//     const [state, dispatch] = useContext(UserContext);

//     return state.isLogin ? <Outlet /> : <Navigate to="/" />
// }

// export default PrivateRoute;

export function PrivateRouteLogin() {
    const [state] = useContext(UserContext);

    if (!state.isLogin) {
        return <Navigate to="/" />;
    }
    return <Outlet />;
}

export function PrivateRouteUser() {
    const [state] = useContext(UserContext);

    if (state.user.role === "admin") {
        return <Navigate to="/admin" />;
    }
    return <Outlet />;
}

export function PrivateRouteAdmin() {
    const [state] = useContext(UserContext);

    if (state.user.role !== "admin") {
        return <Navigate to="/" />;
    }
    return <Outlet />;
}