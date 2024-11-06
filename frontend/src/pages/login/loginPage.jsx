import loginImg from '@/assets/loginbg.png';
import { authService } from '@/utils/authService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const initialFormState = {
        username: '',
        password: '',
        showPassword: false,
    };

    const initialErrorState = {
        username: '',
        password: '',
        server: '',
    };

    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState(initialErrorState);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Vui lòng nhập email';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Vui lòng nhập password';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
                server: '',
            }));
        }
    };

    // Toggle password visibility
    const toggleShowPassword = () => {
        setFormData((prev) => ({
            ...prev,
            showPassword: !prev.showPassword,
        }));
    };

    // Format date to dd-MM-yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).split('/').join('-');
    };

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const loginResponse = await authService.login(
                formData.username.trim(),
                formData.password
            );

            if (!loginResponse?.data?.token) {
                throw new Error('Token không hợp lệ');
            }

            const token = loginResponse.data.token;
            const roles = loginResponse.data.roles;
            const username = loginResponse.data.username;
       
            localStorage.setItem(
                'currentUser',
                JSON.stringify({
                    username: username,
                    roles: roles,
                    token: token
                })
            )
            
            localStorage.setItem('token', [token, roles]);

            const userRole = loginResponse.data.role;
            if (userRole && userRole.includes('ADMIN')) {
                navigate('/admin');
            } else {
                navigate('/');
            }

        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                server: error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.',
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center font-montserrat">
            <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5">
                <div className="md:w-1/2 px-10 pt-7">
                    <h2 className="font-bold text-2xl text-sky-700 text-center">Đăng nhập</h2>
                    <p className="text-sm mt-4 text-sky-700 text-center">Nếu đã có tài khoản, hãy đăng nhập</p>

                    {errors.server && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                            <span className="block sm:inline">{errors.server}</span>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="flex flex-col justify-center">
                        <div className="mb-4">
                            <input
                                className={`p-2 mt-8 rounded-xl border w-full
                                    focus:outline-none focus:border-sky-700
                                    ${errors.username ? 'border-red-500' : ''}`}
                                type="text"
                                name="username"
                                placeholder="Nhập tên đăng nhập..."
                                value={formData.username}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            {errors.username && <small className="text-red-600 ml-2">{errors.username}</small>}
                        </div>

                        <div className="relative mb-4">
                            <input
                                className={`p-2 rounded-xl border w-full
                                    focus:outline-none focus:border-sky-700
                                    ${errors.password ? 'border-red-500' : ''}`}
                                type={formData.showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Nhập mật khẩu..."
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                onClick={toggleShowPassword}
                                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                                viewBox="0 0 16 16"
                            >
                                {formData.showPassword ? (
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                ) : (
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8zM8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                )}
                            </svg>
                            {errors.password && <small className="text-red-600 ml-2">{errors.password}</small>}
                        </div>

                        <button
                            type="submit"
                            className="bg-sky-800 rounded-xl text-white py-2 
                                hover:bg-sky-700 transition duration-300 disabled:opacity-50"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                        </button>
                    </form>

                    <p className="mt-5 text-xs border-b border-gray-400 pb-4" onClick={() => (window.location.href = '/home/forgot_password')}>
                        <span className="cursor-pointer hover:text-blue-800 hover:underline">Quên mật khẩu?</span>
                    </p>
                    <button
                        className="bg-white border py-2 w-full rounded-xl mt-5 
                            flex justify-center items-center text-sm 
                            hover:bg-gray-200 transition duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-3" viewBox="0 0 48 48">
                            <path
                                fill="#FFC107"
                                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                            ></path>
                            <path
                                fill="#FF3D00"
                                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                            ></path>
                            <path
                                fill="#4CAF50"
                                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                            ></path>
                            <path
                                fill="#1976D2"
                                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                            ></path>
                        </svg>
                        Đăng nhập với Google
                    </button>
                    <div className="mt-3 text-xs flex justify-between items-center">
                        <p>Không có tài khoản...</p>
                        <button
                            onClick={() => (window.location.href = '/home/register_user')}   
                            className="py-2 px-5 bg-white border rounded-xl 
                            hover:bg-gray-200 transition duration-300"
                        >
                            Đăng ký
                        </button>
                    </div>
                </div>

                <div className="md:block hidden w-1/2">
                    <img src={loginImg} alt="LoginImage" className="rounded-2xl" />
                </div>
            </div>
        </section>
    );
}

export default LoginPage;