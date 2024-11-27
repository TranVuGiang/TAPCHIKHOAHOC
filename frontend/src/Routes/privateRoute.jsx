import { authService } from '@/utils/authService';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const location = useLocation();
    const arr = JSON.parse(localStorage.getItem('currentUser'));
    const currentUser = Object.values(arr.roles);

    const checkToken = async () => {
        const response = await authService.checkToken(arr.token);
        if (!response.success) {
            localStorage.removeItem('currentUser');
            return <Navigate to="/login" state={{ from: location }} replace />;
        }
    };

    checkToken();
    // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
    if (!arr) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    const hasRoles = allowedRoles.some((role) => currentUser.includes(role));
    // Nếu vai trò hiện tại không được phép truy cập, chuyển hướng về trang không có quyền truy cập
    if (allowedRoles.length > 0 && !hasRoles) {
        return <Navigate to="/no-access" state={{ returnPath: '/' }} replace />;
    }

    // Nếu người dùng có quyền truy cập, hiển thị nội dung
    return children;
};

export default ProtectedRoute;
