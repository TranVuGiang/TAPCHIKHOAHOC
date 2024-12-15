import { ErrorDialog, SuccessDialog } from '@/components/modalDialog';
import { authService } from '@/utils/authService';
import { Mail } from 'lucide-react';
import { useState } from 'react';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        general: '',
    });
    const [loading, setLoading] = useState(false);
    const [showSuccessDialog, setShowSuccessDialog] = useState(false);
    const [showErrorDialog, setShowErrorDialog] = useState(false);

    const validateEmail = (email) => {
        const newErrors = {};

        // Kiểm tra email trống
        if (!email || !email.trim()) {
            newErrors.email = 'Vui lòng nhập email';
            return false;
        }

        // Kiểm tra độ dài email
        if (email.length > 100) {
            newErrors.email = 'Email không được vượt quá 100 ký tự';
            return false;
        }

        if (email.length < 6) {
            newErrors.email = 'Email phải có ít nhất 6 ký tự';
            return false;
        }

        // Kiểm tra định dạng email cơ bản
        const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!basicEmailRegex.test(email)) {
            newErrors.email = 'Định dạng email không hợp lệ';
            return false;
        }

        // Kiểm tra định dạng email chi tiết
        const detailedEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!detailedEmailRegex.test(email)) {
            newErrors.email = 'Email chỉ được chứa chữ cái, số và các ký tự . _ -';
            return false;
        }

        // Kiểm tra tên miền email
        const domain = email.split('@')[1];
        const invalidDomains = ['test.com', 'example.com', 'temporary.com'];
        if (invalidDomains.includes(domain.toLowerCase())) {
            newErrors.email = 'Vui lòng sử dụng email thật';
            return false;
        }

        // Kiểm tra phần local của email
        const localPart = email.split('@')[0];
        if (localPart.length < 2) {
            newErrors.email = 'Tên email quá ngắn';
            return false;
        }

        // Kiểm tra ký tự đặc biệt liên tiếp
        if (/[._-]{2,}/.test(localPart)) {
            newErrors.email = 'Email không được chứa các ký tự đặc biệt liên tiếp';
            return false;
        }

        // Kiểm tra ký tự đầu và cuối của local part
        if (/^[._-]|[._-]$/.test(localPart)) {
            newErrors.email = 'Email không được bắt đầu hoặc kết thúc bằng ký tự đặc biệt';
            return false;
        }

        setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset errors
        setErrors({ email: '', general: '' });
        setShowErrorDialog(false);

        // Loại bỏ khoảng trắng đầu cuối của email
        const trimmedEmail = email.trim();

        if (!validateEmail(trimmedEmail)) {
            setShowErrorDialog(true);
            return;
        }

        setLoading(true);
        try {
            await authService.forgot_pass(trimmedEmail);
            setShowSuccessDialog(true);
            setEmail('');
        } catch (err) {
            const newErrors = {
                general: err.message || 'Lỗi không thể gửi mail',
                email: '',
            };
            setErrors(newErrors);
            setShowErrorDialog(true);
        } finally {
            setLoading(false);
        }
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        // Clear errors khi user bắt đầu nhập lại
        if (errors.email || errors.general) {
            setErrors({ email: '', general: '' });
            setShowErrorDialog(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-red-950 font-montserrat">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-red-700 mb-2">Quên mật khẩu?</h2>
                    <p className="text-emerald-700">Nhập email của bạn để nhận link đặt lại mật khẩu</p>
                </div>

                {errors.general && (
                    <ErrorDialog
                        isOpen={showErrorDialog}
                        onClose={() => setShowErrorDialog(false)}
                        title={errors.general}
                    />
                )}

                <SuccessDialog
                    isOpen={showSuccessDialog}
                    onClose={() => setShowSuccessDialog(false)}
                    title="Vui lòng kiểm tra email"
                    titleButton="Tiếp tục"
                />

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-red-500" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                onBlur={() => validateEmail(email.trim())}
                                placeholder="Email của bạn"
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-emerald-500 bg-gray-50
                  ${errors.email ? 'border-red-500' : 'border-red-200'}`}
                                required
                            />
                        </div>
                        {errors.email && <div className="mt-2 text-sm text-red-600">{errors.email}</div>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading || errors.email || errors.general}
                    >
                        {loading ? 'Đang gửi...' : 'Gửi mail'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;
