import { Navigate } from 'react-router-dom';

const EmployeeRoute = ({ children }) => {
    const token = localStorage.getItem('employeetoken');
    const session = sessionStorage.getItem('employeeid');
    return token && session ? children : <Navigate to="/employeelogin" replace />;
};

export default EmployeeRoute;