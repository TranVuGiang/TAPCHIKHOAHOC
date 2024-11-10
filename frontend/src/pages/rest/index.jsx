import { authService } from '@/utils/authService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorDialog, SuccessDialog } from '@/components/modalDialog';

const ResetPassword = () => {
    const initialFormState = {
        newPassword: '',
        confirmPassword: '',
        showNewPassword: false,
        showConfirmPassword: false,
    };

    const initialErrorState = {
        newPassword: '',
        confirmPassword: '',
        server: '',
    };

    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState(initialErrorState);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenParam = urlParams.get('token');
        if (!tokenParam) {
            setErrors(prev => ({
                ...prev,
                server: 'Token không hợp lệ hoặc đã hết hạn'
            }));
            return;
        }
        setToken(tokenParam);
    }, []);

    // Form validation
    const validateForm = () => {
        const newErrors = {};

        // Password validation
        if (!formData.newPassword) {
            newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Mật khẩu phải có ít nhất 8 ký tự';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
            newErrors.newPassword = 'Mật khẩu phải chứa chữ hoa, chữ thường và số';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu không khớp';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: '',
                server: '',
            }));
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await authService.resetPass(token, formData.newPassword);
            setShowSuccessDialog(true);
            
            // Navigate after showing success message
            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (error) {
            setErrors(prev => ({
                ...prev,
                server: error.message || 'Không thể đặt lại mật khẩu. Vui lòng thử lại.',
            }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center font-montserrat">
            <div className="bg-gray-100 rounded-2xl shadow-lg max-w-md w-full p-8">
                <div className="text-center">
                    <h2 className="font-bold text-2xl text-sky-700">Đặt Lại Mật Khẩu</h2>
                    <p className="text-sm mt-4 text-sky-700">
                        Vui lòng nhập mật khẩu mới của bạn
                    </p>
                </div>

                {errors.server && (
                    <ErrorDialog title={errors.server} />
                )}
                
                <SuccessDialog 
                    isOpen={showSuccessDialog}
                    onClose={() => setShowSuccessDialog(false)}
                    title="Đặt lại mật khẩu thành công"
                />

                <form onSubmit={handleSubmit} className="mt-8">
                    <div className="mb-4">
                        <div className="relative">
                            <input
                                className={`p-3 rounded-xl border w-full
                                    focus:outline-none focus:border-sky-700
                                    ${errors.newPassword ? 'border-red-500' : ''}`}
                                type={formData.showNewPassword ? 'text' : 'password'}
                                name="newPassword"
                                placeholder="Nhập mật khẩu mới..."
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                onClick={() => togglePasswordVisibility('showNewPassword')}
                                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                                viewBox="0 0 16 16"
                            >
                                {formData.showNewPassword ? (
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                ) : (
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8zM8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                )}
                            </svg>
                        </div>
                        {errors.newPassword && (
                            <small className="text-red-600 ml-2">{errors.newPassword}</small>
                        )}
                    </div>

                    <div className="mb-6">
                        <div className="relative">
                            <input
                                className={`p-3 rounded-xl border w-full
                                    focus:outline-none focus:border-sky-700
                                    ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                type={formData.showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Xác nhận mật khẩu..."
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                disabled={isLoading}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                onClick={() => togglePasswordVisibility('showConfirmPassword')}
                                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                                viewBox="0 0 16 16"
                            >
                                {formData.showConfirmPassword ? (
                                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                                ) : (
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8zM8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                )}
                            </svg>
                        </div>
                        {errors.confirmPassword && (
                            <small className="text-red-600 ml-2">{errors.confirmPassword}</small>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-sky-800 rounded-xl text-white py-3 
                            hover:bg-sky-700 transition duration-300 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ResetPassword;


// import { authService } from '@/utils/authService';
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const RestPassword = () => {
//     const [newpassword, setNewpassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [error, setError] = useState('');
//     const [errors, setErrors] = useState('');
//     const navigate = useNavigate();
//     const [token, setToken] = useState('')

//     useEffect(() => {
//         const urlParams = new URLSearchParams(window.location.search);
//         const token = urlParams.get('token');
//         setToken(token)
//     }, [navigate]);

   

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (newpassword !== confirmPassword) {
//             setError('Passwords do not match!');
//         } else {
//             setError('');
//             try {
//                 await authService.resetPass(token, newpassword);
//                 console.log('Password reset successfully!');
//                 navigate('/login');
//             } catch (error) {
//                 setErrors({ general: error.message || 'Không nớ được mật khẩu' });
//             }
//         }
//     };

//     return (
//         <div className="flex items-center justify-center h-[500px] bg-blue-100 font-montserrat">
//             <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
//                 <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">Đặt Lại Mật Khẩu</h2>
//                 {errors.general && (
//                     <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">{errors.general}</div>
//                 )}
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">Nhập mật khẩu mới</label>
//                         <input
//                             type="password"
//                             placeholder="Nhập mật khẩu mới"
//                             value={newpassword}
//                             onChange={(e) => setNewpassword(e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">Xác nhận mật khẩu</label>
//                         <input
//                             type="password"
//                             placeholder="Xác nhận lại mật khẩu vừa nhập"
//                             value={confirmPassword}
//                             onChange={(e) => setConfirmPassword(e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//                     <button
//                         type="submit"
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
//                     >
//                         Đặt lại
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default RestPassword;
