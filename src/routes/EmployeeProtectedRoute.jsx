import { Navigate } from 'react-router-dom';

const EmployeeProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('employeetoken');
    const session = sessionStorage.getItem('employeeid');
    return token && session ? <Navigate to="/Employeelayout" replace /> : children;
};

export default EmployeeProtectedRoute;
