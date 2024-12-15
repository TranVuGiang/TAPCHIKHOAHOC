import { SuccessDialog } from '@/components/modalDialog';
import { authService } from '@/utils/authService';
import { useEffect, useState } from 'react';

const PasswordChangeForm = ({ username }) => {
    // Form states
    const [formData, setFormData] = useState({
        username: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            username: username,
        }));
    }, [username]);
    // Show/hide password states
    const [showPasswords, setShowPasswords] = useState({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false,
    });

    // Error state
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Password validation rules
    const passwordRules = {
        minLength: 6,
        requireNumbers: true,
        requireSpecialChars: true,
    };

    const validatePassword = (password) => {
        const errors = [];

        if (password.length < passwordRules.minLength) {
            errors.push(`Mật khẩu phải có ít nhất ${passwordRules.minLength} ký tự`);
        }

        if (passwordRules.requireNumbers && !/\d/.test(password)) {
            errors.push('Mật khẩu phải chứa ít nhất 1 số');
        }

        if (passwordRules.requireSpecialChars && !/[!@#$%^&*]/.test(password)) {
            errors.push('Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt (!@#$%^&*)');
        }

        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const togglePasswordVisibility = (field) => {
        setShowPasswords((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate current password
        if (!formData.currentPassword.trim()) {
            newErrors.currentPassword = 'Vui lòng nhập mật khẩu hiện tại';
        }

        // Validate new password
        if (!formData.newPassword) {
            newErrors.newPassword = 'Vui lòng nhập mật khẩu mới';
        } else {
            const passwordErrors = validatePassword(formData.newPassword);
            if (passwordErrors.length > 0) {
                newErrors.newPassword = passwordErrors;
            }
        }

        // Validate confirm password
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu mới';
        } else if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        // Check if new password is same as current
        if (formData.newPassword === formData.currentPassword) {
            newErrors.newPassword = 'Mật khẩu mới không được trùng với mật khẩu hiện tại';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            // API call would go here
            const response = await authService.changePassword({
                username: formData.username,
                password: formData.currentPassword,
                newpassword: formData.newPassword,
            });
            console.log('Submitting form data:', response);
            setIsSubmitting(true);
            setFormData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors((prev) => ({
                ...prev,
                submit: 'Có lỗi xảy ra khi đổi mật khẩu. Vui lòng thử lại.',
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderPasswordInput = (name, label, placeholder) => (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="relative">
                <input
                    type={showPasswords[name] ? 'text' : 'password'}
                    name={name}
                    value={formData[name] || ''}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
            ${errors[name] ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'}`}
                    disabled={isSubmitting}
                />
                <button
                    type="button"
                    onClick={() => togglePasswordVisibility(name)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                    {showPasswords[name] ? '👁️' : '👁️‍🗨️'}
                </button>
            </div>
            {errors[name] && (
                <div className="mt-1 text-sm text-red-500">
                    {Array.isArray(errors[name])
                        ? errors[name].map((error, index) => <div key={index}>{error}</div>)
                        : errors[name]}
                </div>
            )}
        </div>
    );

    return (
        <div className="max-w-md lg:max-w-lg xl:max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center lg:text-left">Đổi mật khẩu</h2>
            <SuccessDialog
                isOpen={isSubmitting}
                onClose={() => setIsSubmitting(false)}
                title="Đăng nhập thành công"
                titleButton="Tiếp tục"
            />
            <form onSubmit={handleSubmit} className="space-y-6">
                {renderPasswordInput('currentPassword', 'Mật khẩu hiện tại', 'Mật khẩu hiện tại')}

                {renderPasswordInput('newPassword', 'Mật khẩu mới', 'Mật khẩu mới')}

                {renderPasswordInput('confirmPassword', 'Xác nhận mật khẩu mới', '')}

                {errors.submit && (
                    <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-lg">{errors.submit}</div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded-lg text-white font-medium
                ${
                    isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors duration-200`}
                >
                    {isSubmitting ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                </button>
            </form>

            <div className="mt-4 text-sm text-gray-600">
                <p className="font-medium mb-2">Mật khẩu phải đáp ứng các yêu cầu sau:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Ít nhất {passwordRules.minLength} ký tự</li>
                    <li>Chứa ít nhất 1 số</li>
                    <li>Chứa ít nhất 1 ký tự đặc biệt (!@#$%^&*)</li>
                </ul>
            </div>
        </div>
    );
};

export default PasswordChangeForm;
