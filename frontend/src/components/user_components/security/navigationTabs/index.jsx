
const NavigationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        <button
          onClick={() => setActiveTab('profile')}
          className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeTab === 'profile'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Điều chỉnh thông tin
        </button>
        <button
          onClick={() => setActiveTab('copyright')}
          className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeTab === 'copyright'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Đăng ký quyền tác giả
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`py-4 px-6 font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeTab === 'password'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Thay đổi mật khẩu
        </button>
      </nav>
    </div>
  );
};

export default NavigationTabs;