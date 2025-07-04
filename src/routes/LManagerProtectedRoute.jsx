import { Navigate } from 'react-router-dom';

const LManagerProtectedRoute = ({ children }) => {
  const lowerManagerToken = localStorage.getItem('lowermanagertoken');
  const lowerManagerSession= sessionStorage.getItem('lowermanagerid');
  return lowerManagerToken && lowerManagerSession ? <Navigate to="/LowerManagerlayout" replace /> : children;
};

export default LManagerProtectedRoute;
