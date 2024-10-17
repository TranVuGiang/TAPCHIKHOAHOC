import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const location = useLocation();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // Chưa đăng nhập, chuyển hướng đến trang đăng nhập với URL trả về
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
        // Không có quyền truy cập, chuyển hướng về trang chủ
        return <Navigate to="/home" replace />;
    }

    return children;
};

export default ProtectedRoute;