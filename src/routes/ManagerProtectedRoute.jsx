import { Navigate } from 'react-router-dom';

const ManagerProtectedRoute = ({ children }) => {
  const managerToken = localStorage.getItem('managertoken');
  const managerSession= sessionStorage.getItem('managerid');
  return managerToken && managerSession ? <Navigate to="/Managerlayout" replace /> : children;
};

export default ManagerProtectedRoute;
