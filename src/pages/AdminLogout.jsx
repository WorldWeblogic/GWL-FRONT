import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from "../contexts/auth";

function Adminlogout() {
  
    const { logoutadmin } = useAuth();
    useEffect(() => {
        logoutadmin();
    }, [logoutadmin]);
  return (
       <>
          <Navigate to="/" />
       </>
  )
}

export default Adminlogout
