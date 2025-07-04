import { Navigate } from 'react-router-dom';
 
const LManagerRoute = ({ children }) => {
  const lowerManagerToken = localStorage.getItem('lowermanagertoken');
  const lowerManagerSession= sessionStorage.getItem('lowermanagerid');
  return lowerManagerToken && lowerManagerSession ? children : <Navigate to="/lowermanagerlogin" replace />;
};
 
export default LManagerRoute;