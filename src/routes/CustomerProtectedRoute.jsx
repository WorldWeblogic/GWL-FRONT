import { Navigate } from 'react-router-dom';

const CustomerProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const session= sessionStorage.getItem('id');
  return token && session ? <Navigate to="/Customerlayout" replace /> : children;
};

export default CustomerProtectedRoute;
