import { authService } from '@/utils/authService';
import { Mail } from 'lucide-react';
import { useState } from 'react';
import { ErrorDialog, SuccessDialog } from '@/components/modalDialog';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const validateEmail = (email) => {
    // Kiểm tra email trống
    if (!email || !email.trim()) {
      setError('Vui lòng nhập email');
      return false;
    }

    // Kiểm tra độ dài email
    if (email.length > 100) {
      setError('Email không được vượt quá 100 ký tự');
      return false;
    }

    if (email.length < 6) {
      setError('Email phải có ít nhất 6 ký tự');
      return false;
    }

    // Kiểm tra định dạng email cơ bản
    const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!basicEmailRegex.test(email)) {
      setError('Định dạng email không hợp lệ');
      return false;
    }

    // Kiểm tra định dạng email chi tiết
    const detailedEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!detailedEmailRegex.test(email)) {
      setError('Email chỉ được chứa chữ cái, số và các ký tự . _ -');
      return false;
    }

    // Kiểm tra tên miền email
    const domain = email.split('@')[1];
    const invalidDomains = ['test.com', 'example.com', 'temporary.com'];
    if (invalidDomains.includes(domain.toLowerCase())) {
      setError('Vui lòng sử dụng email thật');
      return false;
    }

    // Kiểm tra phần local của email
    const localPart = email.split('@')[0];
    if (localPart.length < 2) {
      setError('Tên email quá ngắn');
      return false;
    }

    // Kiểm tra ký tự đặc biệt liên tiếp
    if (/[._-]{2,}/.test(localPart)) {
      setError('Email không được chứa các ký tự đặc biệt liên tiếp');
      return false;
    }

    // Kiểm tra ký tự đầu và cuối của local part
    if (/^[._-]|[._-]$/.test(localPart)) {
      setError('Email không được bắt đầu hoặc kết thúc bằng ký tự đặc biệt');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

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
      setEmail(''); // Clear form sau khi thành công
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      if (errorMessage.includes('not found') || errorMessage.includes('không tồn tại')) {
        setError('Email không tồn tại trong hệ thống');
      } else if (errorMessage.includes('already sent') || errorMessage.includes('đã gửi')) {
        setError('Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn');
      } else {
        setError('Có lỗi xảy ra. Vui lòng thử lại sau');
      }
      setShowErrorDialog(true);
    } finally {
      setLoading(false);
    }
  };

  // Xử lý thay đổi input theo real-time
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // Clear error khi user bắt đầu nhập lại
    if (error) {
      setError('');
      setShowErrorDialog(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-montserrat">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-cyan-700 mb-2">
            Quên mật khẩu?
          </h2>
          <p className="text-gray-600">
            Nhập email của bạn để nhận link đặt lại mật khẩu
          </p>
        </div>

        {showErrorDialog && (
          <ErrorDialog title={error || "Có lỗi xảy ra"} />
        )}

        <SuccessDialog
          isOpen={showSuccessDialog}
          onClose={() => {
            setShowSuccessDialog(false);
            window.location.href = '/home/login';
          }}
          title="Đã gửi link đặt lại mật khẩu vào email của bạn"
        />

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-cyan-500" />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={handleEmailChange}
                onBlur={() => validateEmail(email.trim())} // Validate khi focus out
                placeholder="Email của bạn"
                className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-cyan-500 bg-gray-50
                  ${error ? 'border-red-500' : 'border-cyan-200'}`}
                required
              />
            </div>
            {error && (
              <div className="mt-2 text-sm text-red-600">
                {error}
              </div>
            )}
          </div>

          <button 
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || error}
          >
            {loading ? 'Đang gửi...' : 'Gửi mail'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;