import loginImg from '@/assets/loginbg.png';
import GoogleLoginButtons from '@/components/googleLogin';
import { ErrorDialog, SuccessDialog } from '@/components/modalDialog';
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
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
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

    // Handle login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const loginResponse = await authService.login(formData.username.trim(), formData.password);

            if (!loginResponse?.data?.token) {
                throw new Error('Token không hợp lệ');
            }

            const token = loginResponse.data.token;
            const roles = loginResponse.data.roles;
            const fullname = loginResponse.data.fullname;

            localStorage.setItem(
                'currentUser',
                JSON.stringify({
                    fullname: fullname,
                    roles: roles,
                    token: token,
                }),
            );

            localStorage.setItem('token', [token, roles]);

            // Show success dialog
            setShowSuccessDialog(true);

            // Navigate after a short delay
            setTimeout(() => {
                const userRole = loginResponse.data.role;
                if (userRole && userRole.includes('ADMIN')) {
                    navigate('/admin');
                } else {
                    navigate('/');
                }
            }, 1500); // 1.5 second delay to show success message
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                server: error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.',
            }));
            setLoadingErrors(true);
        } finally {
            setIsLoading(false);
        }
    };  
    const [loadingErrors, setLoadingErrors] = useState(false);

    return (
        <section className="min-h-screen flex items-center justify-center font-montserrat">
            <div className="bg-gray-100 flex justify-center rounded-2xl shadow-lg max-w-3xl w-full p-5">
                    <div className="md:w-1/2 px-10 pt-7">
                        <h2 className="font-bold text-2xl text-sky-700 text-center">Đăng nhập</h2>
                        <p className="text-sm mt-4 text-sky-700 text-center">Nếu đã có tài khoản, hãy đăng nhập</p>
                        {errors.server && (
                            <ErrorDialog
                                isOpen={loadingErrors}
                                onClose={() => setLoadingErrors(false)}
                                title="Email hoặc mật khẩu không hợp lệ"
                            />
                        )}

                        <SuccessDialog
                            isOpen={showSuccessDialog}
                            onClose={() => setShowSuccessDialog(false)}
                            title="Đăng nhập thành công"
                            titleButton={'Tiếp tục'}
                        />

                        <form onSubmit={handleLogin} className="flex flex-col justify-center">
                            <div className="mb-4">
                                <input
                                    className={`p-2 mt-8 rounded-lg border w-full
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
                            <div className="relative mb-4 min-h-[56px]">
                                <div className="relative">
                                    <input
                                        className={`p-2 rounded-lg border w-full
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
                                        className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer hover:text-gray-700"
                                        viewBox="0 0 16 16"
                                    >
                                        {formData.showPassword ? (
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                        ) : (
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8zM8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                        )}
                                    </svg>
                                </div>
                                {errors.password && <small className="text-red-600 ml-2">{errors.password}</small>}
                            </div>

                            <button
                                type="submit"
                                className="bg-sky-800 rounded-lg text-white py-2 
                                hover:bg-sky-700 transition duration-300 disabled:opacity-50"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                            </button>
                        </form>

                        <p
                            className="mt-5 text-xs border-b border-gray-400 pb-4"
                            onClick={() => (window.location.href = '/home/forgot_password')}
                        >
                            <span className="cursor-pointer hover:text-blue-800 hover:underline">Quên mật khẩu?</span>
                        </p>
                        <GoogleLoginButtons />
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
