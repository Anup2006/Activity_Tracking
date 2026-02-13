import {Navigate,Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

export default function ProtectedRoutes(){

    const {token}=useSelector((state)=>state.auth);
    const storedToken = localStorage.getItem("token");

    if(!token && !storedToken){
        return <Navigate to="/login" replace />;
    }
    return <Outlet/>;
}