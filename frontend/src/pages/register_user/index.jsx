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
    hovaten: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.username.trim() === '') {
      newErrors.username = 'Vui lòng nhập tên đăng nhập';
    }
    if (formData.password.trim() === '') {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp!';
    }
    if (formData.email.trim() === '') {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    if (formData.sdt.trim() === '') {
      newErrors.sdt = 'Vui lòng nhập số điện thoại';
    } else if (!isValidPhoneNumber(formData.sdt)) {
      newErrors.sdt = 'Số điện thoại không hợp lệ';
    }
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
        ''
      );
      setSuccess(true);
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        sdt: '',
        hovaten: ''
      });
      navigate("/home/otp");
    } catch (err) {
      setErrors({ general: err.message || 'Có lỗi xảy ra khi đăng ký' });
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigate("/");
    setSuccess(false);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phoneNumber);
  };

  const InputField = ({ label, icon: Icon, type, name, value, placeholder, error }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-blue-500" />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-montserrat">
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="text-center text-3xl font-extrabold text-blue-800">
          Đăng ký tài khoản
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Vui lòng điền đầy đủ thông tin bên dưới
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {errors.general && <ErrorDialog title={errors.general} />}
          {success && (
            <SuccessDialog
              title={"Đăng ký thành công"}
              isOpen={success}
              onDeactivate={handleContinue}
            />
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1 */}
              <div className="space-y-6">
                <InputField
                  label="Tên đăng nhập"
                  icon={UserCircle}
                  type="text"
                  name="username"
                  value={formData.username}
                  placeholder="Nhập tên đăng nhập"
                  error={errors.username}
                />

                <InputField
                  label="Mật khẩu"
                  icon={Key}
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="********"
                  error={errors.password}
                />

                <InputField
                  label="Xác nhận mật khẩu"
                  icon={Key}
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="********"
                  error={errors.confirmPassword}
                />
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                <InputField
                  label="Email"
                  icon={Mail}
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="example@email.com"
                  error={errors.email}
                />

                <InputField
                  label="Số điện thoại"
                  icon={Phone}
                  type="tel"
                  name="sdt"
                  value={formData.sdt}
                  placeholder="0123456789"
                  error={errors.sdt}
                />

                <InputField
                  label="Họ và tên"
                  icon={User}
                  type="text"
                  name="hovaten"
                  value={formData.hovaten}
                  placeholder="Họ và tên của bạn"
                  error={errors.hovaten}
                />
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