import React, { useState, useRef, useEffect } from 'react';

export default function OTP() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== '') {
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace') {
      if (index > 0 && otp[index] === '') {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    console.log('OTP submitted:', otpValue);
    // Xử lý logic gửi OTP ở đây
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-cyan-600 mb-2">Xác thực OTP</h2>
          <p className="text-gray-500">
            Vui lòng nhập mã OTP đã được gửi đến thiết bị của bạn
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-2 mb-8">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                className="w-12 h-12 border-2 rounded bg-white focus:border-cyan-500 focus:outline-none text-center text-xl font-semibold text-gray-700 transition-all border-gray-200 hover:border-cyan-400"
              />
            ))}
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-cyan-600 text-white rounded-lg px-4 py-3 font-semibold hover:bg-cyan-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
            >
              Xác nhận
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-500">
            Không nhận được mã?{' '}
            <button className="text-cyan-600 hover:text-cyan-700 font-semibold">
              Gửi lại
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}