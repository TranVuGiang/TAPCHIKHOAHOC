import { AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="text-center">
                <AlertTriangle className="mx-auto mb-6 text-red-500 w-24 h-24" />
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Trang Không Tồn Tại</h1>
                <p className="text-gray-600 mb-8">Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
                <div className="flex justify-center space-x-4">
                    <Link 
                        to="/home" 
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Về Trang Chủ
                    </Link>
                    <Link 
                        to="/" 
                        className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Quay Lại
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;