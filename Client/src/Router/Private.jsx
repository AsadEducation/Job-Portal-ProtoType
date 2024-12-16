import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const Private = ({ children }) => {

    const { user } = useContext(AuthContext);
    const location = useLocation();

    // console.log(location);


    if (!user) return <span className="loading mx-auto my-auto loading-spinner loading-md"></span>
    if (user) return children;

    return <Navigate state={location.pathname} to={`/auth/login`} />

};

export default Private;