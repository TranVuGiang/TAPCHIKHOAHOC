import { authService } from '@/utils/authService';
import { useState } from 'react';

const OTPVerification = () => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError('Vui lòng nhập đủ 6 số');
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.verify(otp);
      if (response === 'Xác thực thành công') {
        // Xác thực thành công, chuyển hướng hoặc hiển thị thông báo
        alert(response);
      } else {
        setError(response);
      }
    } catch (err) {
      setError(err.message || 'Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center font-montserrat">
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Xác thực OTP</h2>
          <p className="text-gray-600">Vui lòng nhập mã OTP đã được gửi đến thiết bị của bạn</p>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4 p-2 bg-red-50 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={handleOTPChange}
            className="w-full px-4 py-3 border-2 rounded bg-white focus:border-cyan-500 focus:outline-none text-center text-xl font-semibold text-gray-700 transition-all border-gray-200 hover:border-cyan-400 disabled:bg-gray-100"
            placeholder="Nhập mã OTP"
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg hover:bg-cyan-700 transition-colors disabled:bg-cyan-300 font-medium mt-4"
          >
            {isLoading ? 'Đang xử lý...' : 'Xác nhận'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;