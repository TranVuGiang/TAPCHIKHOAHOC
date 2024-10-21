import { BookmarkPlus, ChevronRight, Eye, History, Lock, User } from 'lucide-react';
import { useState } from 'react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const menuItems = [
    { id: 'profile', title: 'Hồ sơ của tôi', icon: User },
    { id: 'saved', title: 'Bài viết đã lưu', icon: BookmarkPlus },
    { id: 'history', title: 'Lịch sử đọc', icon: History },
    { id: 'viewed', title: 'Bài viết đã xem', icon: Eye },
    { id: 'security', title: 'Bảo mật tài khoản', icon: Lock },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="/api/placeholder/96/96"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold">Nguyễn Văn A</h3>
                <p className="text-gray-600">nguyenvana@example.com</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Thông tin cá nhân</h3>
              <div className="space-y-3">
                <div className="flex border-b border-gray-100 pb-3">
                  <span className="font-medium w-32">Số điện thoại:</span>
                  <span className="text-gray-600">0123456789</span>
                </div>
                <div className="flex border-b border-gray-100 pb-3">
                  <span className="font-medium w-32">Địa chỉ:</span>
                  <span className="text-gray-600">Hà Nội, Việt Nam</span>
                </div>
                <div className="flex border-b border-gray-100 pb-3">
                  <span className="font-medium w-32">Ngày tham gia:</span>
                  <span className="text-gray-600">01/01/2024</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'saved':
        return (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Bài viết đã lưu #{item}</h4>
                    <p className="text-sm text-gray-600">Lưu ngày: 01/0{item}/2024</p>
                  </div>
                  <ChevronRight className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'history':
        return (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Bài viết đã đọc #{item}</h4>
                    <p className="text-sm text-gray-600">Đọc ngày: 01/0{item}/2024</p>
                  </div>
                  <ChevronRight className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'viewed':
        return (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">Bài viết đã xem #{item}</h4>
                    <p className="text-sm text-gray-600">Xem ngày: 01/0{item}/2024</p>
                  </div>
                  <ChevronRight className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="grid md:grid-cols-[250px,1fr] gap-6">
        {/* Sidebar */}
        <div className="bg-white rounded-lg shadow-sm p-4 h-fit">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-2 p-3 rounded-lg transition-colors
                    ${activeTab === item.id 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'hover:bg-gray-100'
                    }`}
                >
                  <Icon size={20} />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gray-50 rounded-lg p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;