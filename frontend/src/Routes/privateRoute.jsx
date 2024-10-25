import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const location = useLocation();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Nếu vai trò hiện tại không được phép truy cập, chuyển hướng về trang không có quyền truy cập
    if (allowedRoles.length > 0 && !allowedRoles.includes(Number(currentUser.role))) {
        return <Navigate to="/no-access" replace />;
    }

    // Nếu người dùng có quyền truy cập, hiển thị nội dung
    return children;
};

export default ProtectedRoute;
