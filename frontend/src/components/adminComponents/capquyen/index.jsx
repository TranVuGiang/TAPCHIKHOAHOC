import { authService } from '@/utils/authService';
import { useEffect, useState } from 'react';

const UserPermissionManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users needing permission
  useEffect(() => {
    const current = JSON.parse(localStorage.getItem('currentUser'))
    const fetchUsers = async () => {
      try {
        const response = await authService.getquyenAuthor({token: current.token});
        console.log(response)
        setUsers(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Không thể tải danh sách người dùng');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle permission update
//   const handlePermissionUpdate = async (userId, status) => {
//     try {
//       await axios.post('/api/admin/update/user/capquyen', {
//         taikhoanId: userId,
//         status: status
//       });

//       // Update local state to remove the processed user
//       setUsers(prevUsers => prevUsers.filter(user => user.taikhoanId !== userId));
//     } catch (err) {
//       alert('Lỗi khi cập nhật quyền');
//     }
//   };

  if (loading) return (
    <div className="flex justify-center items-center h-full p-4">
      <div className="text-gray-600">Đang tải...</div>
    </div>
  );

  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      {error}
    </div>
  );

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="border rounded-lg shadow-lg">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b">
            <h3 className="text-lg leading-6 font-semibold text-gray-900">
              Quản Lý Cấp Quyền Người Dùng
            </h3>
          </div>
          
          {users.length === 0 ? (
            <div className="text-center text-gray-500 p-4">
              Không có yêu cầu cấp quyền nào
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Họ Và Tên
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hành Động
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.taikhoanId}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.hovaten}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                        <button 
                          onClick={() => handlePermissionUpdate(user.taikhoanId, 0)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Từ Chối
                        </button>
                        <button 
                          onClick={() => handlePermissionUpdate(user.taikhoanId, 1)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Chấp Nhận
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPermissionManagement;