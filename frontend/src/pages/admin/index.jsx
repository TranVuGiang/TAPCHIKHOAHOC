import { BarChart2, DollarSign, FileText, LogOut, Menu, Radio, Settings, Users, X } from 'lucide-react';
import { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sample data remains the same
  const users = [
    { id: 1, name: 'Nhân', phone: '0123456789', email: 'tnhan123@gmail.com', url: '/user/nhan', created_at: '2024-01-01', status: 'Hoạt động', username: 'Nguyễn Thành Nhân', password: '********' },
    { id: 2, name: 'Giang', phone: '0987654321', email: 'vgiang123@gmail.com', url: '/user/giang', created_at: '2024-01-02', status: 'Không hoạt động', username: 'Trần Vũ Giang', password: '********' },
  ];

  const articles = [
    { id: 1, title: 'Khám phá khoa học mới', content: 'Lorem ipsum...', published_date: '2024-01-01', url: '/article/1', status: 'Được xuất bản' },
    { id: 2, title: 'Tin nóng', content: 'Lorem ipsum...', published_date: '2024-01-02', url: '/article/2', status: 'bản nháp' },
  ];

  const ads = [
    { id: 1, title: 'Không gian quảng cáo cao cấp', url: '/ads/1', status: 'Hoạt động' },
    { id: 2, title: 'Biểu ngữ thanh bên', url: '/ads/2', status: 'Không hoạt động' },
  ];

  const revenue = [
    { id: 1, ad_title: 'Không gian quảng cáo cao cấp', amount: 1000, date: '2024-01-01' },
    { id: 2, ad_title: 'Biểu ngữ thanh bên', amount: 500, date: '2024-01-02' },
  ];

  const Sidebar = ({ isOpen, onClose }) => (
    <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 w-72 bg-gray-800`}>
      <div className="flex items-center justify-between h-16 bg-gray-900 px-4">
        <span className="text-white text-xl font-semibold">Quản trị viên BC & KH</span>
        <button onClick={onClose} className="lg:hidden text-white">
          <X className="w-6 h-6" />
        </button>
      </div>
      <nav className="mt-6">
        <div className="px-4 py-2 space-y-2">
          {[
            { id: 'dashboard', icon: BarChart2, label: 'Thống kê' },
            { id: 'users', icon: Users, label: 'Quản lý người dùng' },
            { id: 'articles', icon: FileText, label: 'Quản lý bài báo' },
            { id: 'ads', icon: Radio, label: 'Quản lý quảng cáo' },
            { id: 'revenue', icon: DollarSign, label: 'Doanh thu' },
          ].map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              className={`flex items-center w-full px-4 py-2 rounded-lg ${activeTab === id ? 'bg-gray-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => {
                setActiveTab(id);
                onClose();
              }}
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </button>
          ))}
          <button
            className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
            onClick={() => {/* Add logout logic */}}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Đăng xuất
          </button>
        </div>
      </nav>
    </div>
  );

  const TableWrapper = ({ children }) => (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        {children}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-4 lg:p-6">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Thống kê</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-base lg:text-lg font-semibold">Tổng số người dùng</h3>
                <p className="text-2xl lg:text-3xl font-bold">{users.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-base lg:text-lg font-semibold">Tổng số bài báo</h3>
                <p className="text-2xl lg:text-3xl font-bold">{articles.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-base lg:text-lg font-semibold">Tổng số quảng cáo</h3>
                <p className="text-2xl lg:text-3xl font-bold">{ads.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-base lg:text-lg font-semibold">Tổng doanh thu</h3>
                <p className="text-2xl lg:text-3xl font-bold">${revenue.reduce((sum, item) => sum + item.amount, 0)}</p>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="p-4 lg:p-6">
            <h2 className="text-xl lg:text-2xl font-bold mb-4">Quản lý người dùng</h2>
            <TableWrapper>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên</th>
                    <th className="hidden md:table-cell px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">SĐT</th>
                    <th className="hidden sm:table-cell px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="hidden lg:table-cell px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Họ và tên</th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="hidden md:table-cell px-3 lg:px-6 py-4 whitespace-nowrap">{user.phone}</td>
                      <td className="hidden sm:table-cell px-3 lg:px-6 py-4 whitespace-nowrap">{user.email}</td>
                      <td className="hidden lg:table-cell px-3 lg:px-6 py-4 whitespace-nowrap">{user.username}</td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'Hoạt động' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-900">Sửa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrapper>
          </div>
        );

      // Similar pattern for articles, ads, and revenue...
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-montserrat">
      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="bg-white shadow">
            <div className="flex items-center justify-between px-4 lg:px-6 py-4">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-800 ml-2 lg:ml-0">Quản trị viên</h1>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600 mr-4 hidden sm:inline">Cài đặt</span>
                <Settings className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </header>

          {/* Content area */}
          <main className="flex-1 overflow-x-hidden">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;