import { useState } from "react";

// Components/Input.jsx
const Input = ({ label, icon: Icon, ...props }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {Icon && <Icon className="h-5 w-5 text-gray-400" />}
      </div>
      <input
        {...props}
        className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${Icon ? 'pl-10' : ''}`}
      />
    </div>
  );
  
  // Components/Button.jsx
  const Button = ({ children, loading, ...props }) => (
    <button
      {...props}
      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-60"
      disabled={loading}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {children}
    </button>
  );
  
  // RegistrationForm.jsx
  const RegistrationForm = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      fullName: '',
      phone: '',
      email: '',
      registerDate: new Date().toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setLoading(false);
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
          </div>
        </div>
  
        <div className="w-full max-w-md relative">
          {/* Card Container */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-blue-500/10 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Đăng Ký Tài Khoản</h2>
              <p className="text-gray-400">Tham gia cùng chúng tôi ngay hôm nay</p>
            </div>
  
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Tên đăng nhập</label>
                <Input
                  name="username"
                  type="text"
                  required
                  placeholder="Nhập tên đăng nhập"
                  value={formData.username}
                  onChange={handleChange}
                  icon={(props) => (
                    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )}
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Mật khẩu</label>
                <Input
                  name="password"
                  type="password"
                  required
                  placeholder="Nhập mật khẩu"
                  value={formData.password}
                  onChange={handleChange}
                  icon={(props) => (
                    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  )}
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Họ và tên</label>
                <Input
                  name="fullName"
                  type="text"
                  required
                  placeholder="Nhập họ và tên"
                  value={formData.fullName}
                  onChange={handleChange}
                  icon={(props) => (
                    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  )}
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Số điện thoại</label>
                <Input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Nhập số điện thoại"
                  value={formData.phone}
                  onChange={handleChange}
                  icon={(props) => (
                    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  )}
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <Input
                  name="email"
                  type="email"
                  required
                  placeholder="Nhập email"
                  value={formData.email}
                  onChange={handleChange}
                  icon={(props) => (
                    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  )}
                />
              </div>
  
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Ngày đăng ký</label>
                <Input
                  name="registerDate"
                  type="date"
                  required
                  value={formData.registerDate}
                  onChange={handleChange}
                  icon={(props) => (
                    <svg xmlns="http://www.w3.org/2000/svg" {...props} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                  )}
                />
              </div>
  
              <Button type="submit" loading={loading}>
                {loading ? 'Đang xử lý...' : 'Đăng ký'}
              </Button>
  
              <p className="text-center text-sm text-gray-400 mt-4">
                Bằng việc đăng ký, bạn đồng ý với các điều khoản và điều kiện của chúng tôi
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default RegistrationForm;