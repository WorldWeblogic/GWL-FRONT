import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from "../contexts/auth";

function LowerManagerlogout() {
  
    const { logoutlowermanager } = useAuth();
    useEffect(() => {
        logoutlowermanager();
    }, [logoutlowermanager]);
  return (
       <>
          <Navigate to="/lowermanagerlogin" />
       </>
  )
}

export default LowerManagerlogout
