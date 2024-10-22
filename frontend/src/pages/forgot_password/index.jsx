import React from 'react';
import { Mail } from 'lucide-react';

const ForgotPassword = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic gửi email ở đây
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-cyan-700 mb-2">
            Quên mật khẩu?
          </h2>
          <p className="text-gray-600">
            Nhập email của bạn để nhận link đặt lại mật khẩu
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-cyan-500" />
              </div>
              <input 
                type="email" 
                placeholder="Email của bạn"
                className="w-full pl-10 pr-4 py-2 border border-cyan-200 rounded-lg focus:outline-none focus:border-cyan-500 bg-gray-50"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
          >
            Gửi mail
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;