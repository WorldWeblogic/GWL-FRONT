import { Navigate } from 'react-router-dom';
 
const CustomerRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const session= sessionStorage.getItem('id');
  return token && session ? children : <Navigate to="/login" replace />;
};
 
export default CustomerRoute;