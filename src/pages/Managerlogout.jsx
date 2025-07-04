import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from "../contexts/auth";

function Managerlogout() {
  
    const { logoutmanager } = useAuth();
    useEffect(() => {
        logoutmanager();
    }, [logoutmanager]);
  return (
       <>
          <Navigate to="/managerlogin" />
       </>
  )
}

export default Managerlogout
