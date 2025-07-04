import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
    const adminToken = localStorage.getItem('admintoken');
    const adminSession = sessionStorage.getItem('adminid');
    return adminToken && adminSession ? <Navigate to="/layout" replace /> : children;
};

export default AdminProtectedRoute;
