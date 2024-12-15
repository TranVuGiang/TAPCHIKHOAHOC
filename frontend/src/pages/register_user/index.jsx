import { ErrorDialog, SuccessDialog } from '@/components/modalDialog';
import { authService } from '@/utils/authService';
import { Key, Mail, Phone, User, UserCircle } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function RegisterUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        sdt: '',
        hovaten: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validate username
        if (formData.username.trim() === '') {
            newErrors.username = 'Vui lòng nhập tên đăng nhập';
        }

        // Validate password
        if (formData.password.trim() === '') {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp!';
        }

        // Validate email
        if (formData.email.trim() === '') {
            newErrors.email = 'Vui lòng nhập email';
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        // Validate phone number
        if (formData.sdt.trim() === '') {
            newErrors.sdt = 'Vui lòng nhập số điện thoại';
        } else if (!isValidPhoneNumber(formData.sdt)) {
            newErrors.sdt = 'Số điện thoại không hợp lệ';
        }

        // Validate full name
        if (formData.hovaten.trim() === '') {
            newErrors.hovaten = 'Vui lòng nhập họ và tên';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            setLoading(true);
            setErrors({});

            await authService.register(
                formData.username,
                formData.password,
                formData.email,
                formData.sdt,
                formData.hovaten,
                '',
            );
            // localStorage.setItem('data-register', formData);
            setSuccess(true);
            // alert('Đăng ký thành công!');
            setFormData({
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                sdt: '',
                hovaten: '',
            });
            setTimeout(() => {
                navigate('/home/otp');
            }, 1500); // 1.5 second delay to show success message
        } catch (err) {
            setErrors({ general: err.data.data || 'Có lỗi xảy ra khi đăng ký' });
            setLoadingErrors(true)
            console.log(err.data.data);
        } finally {
            setLoading(false);
        }
    };
    const [loadingErrors, setLoadingErrors] = useState(false)
    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isValidPhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{10,11}$/;
        return phoneRegex.test(phoneNumber);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-montserrat">
            <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
                <h2 className="text-center text-3xl font-extrabold text-blue-800">Đăng ký tài khoản</h2>
                <p className="mt-2 text-center text-sm text-gray-600">Vui lòng điền đầy đủ thông tin bên dưới</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
                    {errors.general && <ErrorDialog isOpen={loadingErrors} onClose={() => setLoadingErrors(false)} title={errors.general} />}
                    <SuccessDialog title={'Đăng ký thành công'} isOpen={success} onClose={() => setSuccess(false)} titleButton={"Tiếp tục"}/>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Cột 1 */}
                            <div className="space-y-6">
                                {/* Tên đăng nhập */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Tên đăng nhập</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <UserCircle className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <input
                                            type="text"
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Nhập tên đăng nhập"
                                        />
                                    </div>
                                    {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username}</p>}
                                </div>

                                {/* Mật khẩu */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Key className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="********"
                                        />
                                    </div>
                                    {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                                </div>

                                {/* Xác nhận mật khẩu */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Key className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="********"
                                        />
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>
                                    )}
                                </div>
                            </div>

                            {/* Cột 2 */}
                            <div className="space-y-6">
                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="example@email.com"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                                </div>

                                {/* Số điện thoại */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <input
                                            type="tel"
                                            name="sdt"
                                            value={formData.sdt}
                                            onChange={handleChange}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="0123456789"
                                        />
                                    </div>
                                    {errors.sdt && <p className="text-red-600 text-sm mt-1">{errors.sdt}</p>}
                                </div>

                                {/* Họ và tên */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Họ và tên</label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <input
                                            type="text"
                                            name="hovaten"
                                            value={formData.hovaten}
                                            onChange={handleChange}
                                            className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                            placeholder="Họ và tên của bạn"
                                        />
                                    </div>
                                    {errors.hovaten && <p className="text-red-600 text-sm mt-1">{errors.hovaten}</p>}
                                </div>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
