import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const adminToken = localStorage.getItem('admintoken');
    const adminSession = sessionStorage.getItem('adminid');
    return adminToken && adminSession ? children : <Navigate to="/" replace />;
};

export default AdminRoute;