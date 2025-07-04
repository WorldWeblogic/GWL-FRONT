import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from "../contexts/auth";

function Employeelogout() {
  
    const { logoutemployee } = useAuth();
    useEffect(() => {
        logoutemployee();
    }, [logoutemployee]);
  return (
       <>
          <Navigate to="/employeelogin" />
       </>
  )
}

export default Employeelogout
