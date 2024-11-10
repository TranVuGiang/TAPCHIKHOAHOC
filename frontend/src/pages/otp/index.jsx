import { useState } from 'react';
import { authService } from '@/utils/authService';
import { ErrorDialog, SuccessDialog } from '@/components/modalDialog';
import { useNavigate } from 'react-router-dom';

const OTPVerification = () => {
    const initialFormState = {
        otp: '',
    };

    const initialErrorState = {
        otp: '',
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

        if (!formData.otp.trim()) {
            newErrors.otp = 'Vui lòng nhập mã OTP';
        } else if (formData.otp.length !== 6) {
            newErrors.otp = 'Mã OTP phải đủ 6 kí tự';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Allow alphanumeric characters and limit to 6 characters
        const sanitizedValue = value.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase();
        
        setFormData((prev) => ({
            ...prev,
            [name]: sanitizedValue,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
                server: '',
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const response = await authService.verify(formData.otp.trim());
            
            if (!response?.data?.success) {
                throw new Error('Mã OTP không hợp lệ');
            }

            setShowSuccessDialog(true);
            
            setTimeout(() => {
                navigate('/');
            }, 1500);
            
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                server: error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.',
            }));
        } finally {
            setIsLoading(false);
        }
    };

    // Handle resend OTP
    const handleResendOTP = async () => {
        try {
            await authService.resendOTP();
            setErrors((prev) => ({
                ...prev,
                server: 'Mã OTP mới đã được gửi thành công!',
                isSuccess: true,
            }));
        } catch (error) {
            setErrors((prev) => ({
                ...prev,
                server: 'Không thể gửi lại mã OTP. Vui lòng thử lại sau.',
                isSuccess: false,
            }));
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center font-montserrat">
            <div className="bg-gray-100 rounded-2xl shadow-lg max-w-md w-full p-8">
                <div className="text-center">
                    <h2 className="font-bold text-2xl text-sky-700">Xác thực OTP</h2>
                    <p className="text-sm mt-4 text-sky-700">
                        Vui lòng nhập mã OTP đã được gửi đến thiết bị của bạn
                    </p>
                    <p className="text-xs mt-2 text-gray-600">
                        (Mã OTP gồm 6 ký tự bao gồm chữ và số)
                    </p>
                </div>

                {errors.server && !errors.isSuccess && (
                    <ErrorDialog title={errors.server} />
                )}

                {errors.server && errors.isSuccess && (
                    <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
                        {errors.server}
                    </div>
                )}
                
                <SuccessDialog 
                    isOpen={showSuccessDialog}
                    onClose={() => setShowSuccessDialog(false)}
                    title="Xác thực OTP thành công"
                />

                <form onSubmit={handleSubmit} className="mt-8">
                    <div className="mb-4">
                        <input
                            className={`p-4 rounded-xl border w-full text-center text-xl uppercase
                                tracking-widest font-mono
                                focus:outline-none focus:border-sky-700
                                ${errors.otp ? 'border-red-500' : ''}`}
                            type="text"
                            name="otp"
                            placeholder="Nhập mã OTP..."
                            value={formData.otp}
                            onChange={handleInputChange}
                            disabled={isLoading}
                            autoComplete="off"
                        />
                        {errors.otp && (
                            <small className="text-red-600 ml-2">{errors.otp}</small>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-sky-800 rounded-xl text-white py-3 
                            hover:bg-sky-700 transition duration-300 disabled:opacity-50"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
                    </button>

                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={handleResendOTP}
                            className="text-sky-700 text-sm hover:underline"
                        >
                            Gửi lại mã OTP
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default OTPVerification;