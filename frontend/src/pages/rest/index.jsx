import { authService } from '@/utils/authService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RestPassword = () => {
    const [newpassword, setNewpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();
    const [token, setToken] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        setToken(token)
    }, [navigate]);

   

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newpassword !== confirmPassword) {
            setError('Passwords do not match!');
        } else {
            setError('');
            try {
                await authService.resetPass(token, newpassword);
                console.log('Password reset successfully!');
                navigate('/login');
            } catch (error) {
                setErrors({ general: error.message || 'Không nớ được mật khẩu' });
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-[500px] bg-blue-100 font-montserrat">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Đặt Lại Mật Khẩu</h2>
                {errors.general && (
                    <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">{errors.general}</div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Nhập mật khẩu mới</label>
                        <input
                            type="password"
                            placeholder="Nhập mật khẩu mới"
                            value={newpassword}
                            onChange={(e) => setNewpassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Xác nhận mật khẩu</label>
                        <input
                            type="password"
                            placeholder="Xác nhận lại mật khẩu vừa nhập"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                        Đặt lại
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RestPassword;
