import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export default function Logout() {
    const { logoutuser } = useAuth();
    useEffect(() => {
        logoutuser();
    }, [logoutuser]);
    
    return (
        <>
            <Navigate to="/login" />
        </>
    );
}

