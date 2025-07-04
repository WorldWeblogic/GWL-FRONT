import { Navigate } from 'react-router-dom';
 
const ManagerRoute = ({ children }) => {
  const managerToken = localStorage.getItem('managertoken');
  const managerSession= sessionStorage.getItem('managerid');
  return managerToken && managerSession ? children : <Navigate to="/managerlogin" replace />;
};
 
export default ManagerRoute;