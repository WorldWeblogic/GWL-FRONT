import { Navigate } from 'react-router-dom';
 
const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('admintoken');
 
  return token ? children : <Navigate to="/" replace />;
};
 
export default AdminRoute;