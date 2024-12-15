const NavigationTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-gray-200 bg-white">
      <nav className="flex flex-wrap sm:flex-nowrap -mb-px">
        {/* Tab: Điều chỉnh thông tin */}
        <button
          onClick={() => setActiveTab("profile")}
          className={`w-full sm:w-auto py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeTab === "profile"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Điều chỉnh thông tin
        </button>

        {/* Tab: Đăng ký quyền tác giả */}
        <button
          onClick={() => setActiveTab("copyright")}
          className={`w-full sm:w-auto py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeTab === "copyright"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Đăng ký quyền tác giả
        </button>

        {/* Tab: Thay đổi mật khẩu */}
        <button
          onClick={() => setActiveTab("password")}
          className={`w-full sm:w-auto py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors duration-200 ${
            activeTab === "password"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
          }`}
        >
          Thay đổi mật khẩu
        </button>
      </nav>
    </div>
  );
};

export default NavigationTabs;
