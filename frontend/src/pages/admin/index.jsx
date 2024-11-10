import { BarChart2, DollarSign, FileText, LogOut, Radio, Settings, Users } from 'lucide-react';
import { useState } from 'react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Sample data
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

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Thống kê</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Tổng số người dùng</h3>
                <p className="text-3xl font-bold">{users.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Tổng số bài báo</h3>
                <p className="text-3xl font-bold">{articles.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Tổng số quảng cáo</h3>
                <p className="text-3xl font-bold">{ads.filter(ad => ad.status === 'active').length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Tổng doanh thu</h3>
                <p className="text-3xl font-bold">${revenue.reduce((sum, item) => sum + item.amount, 0)}</p>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Quản lý người dùng</h2>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số điện thoại</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Họ và tên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mật khẩu</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chỉnh sửa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4">{user.name}</td>
                      <td className="px-6 py-4">{user.phone}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.username}</td>
                      <td className="px-6 py-4">{user.password}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'articles':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Quản lý bài báo</h2>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày đăng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trang thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chỉnh sửa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {articles.map(article => (
                    <tr key={article.id}>
                      <td className="px-6 py-4">{article.title}</td>
                      <td className="px-6 py-4">{article.published_date}</td>
                      <td className="px-6 py-4">{article.url}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${article.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'ads':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Quản lý quảng cáo</h2>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Chỉnh sửa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ads.map(ad => (
                    <tr key={ad.id}>
                      <td className="px-6 py-4">{ad.title}</td>
                      <td className="px-6 py-4">{ad.url}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${ad.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {ad.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-900">Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'revenue':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Quản lý doanh thu</h2>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề quảng cáo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Số lượng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ngày</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {revenue.map(item => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">{item.ad_title}</td>
                      <td className="px-6 py-4">${item.amount}</td>
                      <td className="px-6 py-4">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-montserrat">
      {/* Sidebar */}
      <div className="w-65 bg-gray-800">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white text-xl font-semibold">Quản trị viên BC & KH</span>
        </div>
        <nav className="mt-6">
          <div className="px-4 py-2">
            <button
              className={`flex items-center w-full px-4 py-2 rounded-lg ${activeTab === 'dashboard' ? 'bg-gray-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <BarChart2 className="w-5 h-5 mr-3" />
              Thống kê
            </button>
            <button
              className={`flex items-center w-full px-4 py-2 mt-2 rounded-lg ${activeTab === 'users' ? 'bg-gray-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setActiveTab('users')}
            >
              <Users className="w-5 h-5 mr-3" />
              Quản lý người dùng
            </button>
            <button
              className={`flex items-center w-full px-4 py-2 mt-2 rounded-lg ${activeTab === 'articles' ? 'bg-gray-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setActiveTab('articles')}
            >
              <FileText className="w-5 h-5 mr-3" />
              Quản lý bài báo
            </button>
            <button
              className={`flex items-center w-full px-4 py-2 mt-2 rounded-lg ${activeTab === 'ads' ? 'bg-gray-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setActiveTab('ads')}
            >
              <Radio className="w-5 h-5 mr-3" />
              Quản lý quảng cáo
            </button>
            <button
              className={`flex items-center w-full px-4 py-2 mt-2 rounded-lg ${activeTab === 'revenue' ? 'bg-gray-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => setActiveTab('revenue')}
            >
              <DollarSign className="w-5 h-5 mr-3" />
              Doanh thu
            </button>
            <button
              className="flex items-center w-full px-4 py-2 mt-2 text-gray-300 hover:bg-gray-700 rounded-lg"
              onClick={() => {/* Add logout logic */}}
            >
              <LogOut className="w-5 h-5 mr-3" />
              Đăng xuất
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">Quản trị viên</h1>
            <div className="flex items-center">
              <span className="text-gray-600 mr-4">Cài đặt</span>
              <Settings className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </header>

        {/* Content area */}
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;