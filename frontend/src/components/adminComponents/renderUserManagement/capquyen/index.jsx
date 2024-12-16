import { authService } from '@/utils/authService';
import { TrashIcon } from '@heroicons/react/24/solid';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const PermissionManagementPopup = ({ isOpen, onClose, currentPermissions }) => {
    const [newPermission, setNewPermission] = useState({
        vaitroId: '',
        roles: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [roles, setRoles] = useState([]);
    const [userRoles, setUserRoles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (isOpen) {
            loadRole();
            // Initialize userRoles with current permissions
            setUserRoles(currentPermissions.roles || []);
        }
    }, [isOpen, currentPermissions]);

    const loadRole = async () => {
        const current = JSON.parse(localStorage.getItem('currentUser'));
        if (current === null || undefined) {
            return;
        }
        const token = current.token;
        try {
            const resp = await authService.loadRoleByAdmin(token);
            setRoles(resp.data);
        } catch (error) {
            setErrorMessage(error.message || 'Không thể tải danh sách quyền');
        }
    };

    const handleAddRole = async (e) => {
        e.preventDefault();

        if (!newPermission.vaitroId) {
            setErrorMessage('Vui lòng chọn quyền');
            return;
        }

        const current = JSON.parse(localStorage.getItem('currentUser'));
        if (!current) {
            setErrorMessage('Vui lòng đăng nhập lại');
            return;
        }
        const token = current.token;

        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            const resp = await authService.addRolesByAdmin({
                token: token,
                taikhoanId: currentPermissions.taikhoanId,
                role: newPermission.vaitroId,
            });

            // Update local state immediately
            const newRole = {
                vaitroId: newPermission.vaitroId,
                roles: newPermission.roles
            };
            
            setUserRoles([...userRoles, newRole]);
            setSuccessMessage('Thêm quyền thành công');
            
            // Reset permission selection
            setNewPermission({ vaitroId: '', roles: '' });
        } catch (error) {
            setErrorMessage(error.message || 'Không thể thêm quyền');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveRole = async (vaitroId) => {
        const current = JSON.parse(localStorage.getItem('currentUser'));
        if (!current) {
            setErrorMessage('Vui lòng đăng nhập lại');
            return;
        }
        const token = current.token;

        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');

        try {
            await authService.removeRolesByAdmin({
                token: token,
                taikhoanId: currentPermissions.taikhoanId,
                role: vaitroId,
            });

            // Update local state immediately
            const updatedRoles = userRoles.filter(role => role.vaitroId !== vaitroId);
            setUserRoles(updatedRoles);
            setSuccessMessage('Xóa quyền thành công');
        } catch (error) {
            setErrorMessage(error.message || 'Không thể xóa quyền');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const LoadingSpinner = () => {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
                <div className="flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4" />
                    <p className="text-white text-lg">Đang tải...</p>
                </div>
            </div>
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {isLoading && <LoadingSpinner />}
            
            {/* Error Message */}
            {errorMessage && (
                <div className="absolute top-4 right-4 bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded flex items-center z-60">
                    <AlertCircle className="mr-3 text-red-500" size={24} />
                    <span>{errorMessage}</span>
                    <button 
                        onClick={() => setErrorMessage('')}
                        className="ml-4 text-red-500 hover:text-red-700"
                    >
                        <span className="text-2xl">&times;</span>
                    </button>
                </div>
            )}

            {/* Success Message */}
            {successMessage && (
                <div className="absolute top-4 right-4 bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded flex items-center z-60">
                    <CheckCircle className="mr-3 text-green-500" size={24} />
                    <span>{successMessage}</span>
                    <button 
                        onClick={() => setSuccessMessage('')}
                        className="ml-4 text-green-500 hover:text-green-700"
                    >
                        <span className="text-2xl">&times;</span>
                    </button>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-xl p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Quản Lý Quyền</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                {/* Danh sách quyền hiện tại */}
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">Quyền Hiện Tại</h3>
                    {userRoles.length === 0 ? (
                        <p className="text-gray-500">Chưa có quyền nào</p>
                    ) : (
                        <ul className="space-y-2">
                            {userRoles.map((permission, index) => (
                                <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                                    <span>{permission.roles}</span>
                                    <button
                                        onClick={() => handleRemoveRole(permission.vaitroId)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                       <TrashIcon className='size-5 text-red-600'/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Form thêm quyền mới */}
                <div className="space-y-3">
                    <h3 className="font-semibold">Thêm Quyền Mới</h3>
                    <select
                        value={newPermission.vaitroId}
                        onChange={(e) => {
                            const selectedType = roles.find((type) => type.vaitroId === parseInt(e.target.value, 10));
                            setNewPermission({
                                ...newPermission,
                                vaitroId: e.target.value,
                                roles: selectedType ? selectedType.tenrole : '',
                            });
                            setErrorMessage('');
                        }}
                        className="w-full p-2 border rounded"
                    >
                        <option value="">Chọn loại quyền</option>
                        {roles
                            .filter(
                                (role) =>
                                    !userRoles.some((permission) => permission.roles === role.tenrole),
                            )
                            .map((type) => (
                                <option key={type.vaitroId} value={type.vaitroId}>
                                    {type.tenrole}
                                </option>
                            ))}
                    </select>

                    <button
                        onClick={handleAddRole}
                        disabled={!newPermission.vaitroId}
                        className={`w-full p-2 rounded transition ${
                            newPermission.vaitroId 
                                ? 'bg-blue-500 text-white hover:bg-blue-600' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                    >
                        Thêm Quyền
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PermissionManagementPopup;