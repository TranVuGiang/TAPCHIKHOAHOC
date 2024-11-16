import { useState } from 'react';

const FromBaoMatTaiKhoan = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        fullName: 'Trần Vũ Giang',
        phone: '0123456789',
        email: 'giangtv@gmail.com',
        url: 'https://example.com',
        createdDate: '2024-03-13',
        status: 'active',
        username: 'tranvugiang',
        avatar: null,
        workTitle: '',
        workType: '',
        description: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({
            ...prev,
            avatar: file,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    const renderProfileForm = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
                <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        {formData.avatar ? (
                            <img
                                src={URL.createObjectURL(formData.avatar)}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <span className="text-gray-400">No image</span>
                        )}
                    </div>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Họ và tên</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">URL</label>
                    <input
                        type="url"
                        name="url"
                        value={formData.url}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>
            </div>
        </div>
    );

    const renderCopyrightForm = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Tên tác phẩm</label>
                    <input
                        type="text"
                        name="workTitle"
                        value={formData.workTitle}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Loại tác phẩm</label>
                    <select
                        name="workType"
                        value={formData.workType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                        <option value="">Chọn loại tác phẩm</option>
                        <option value="literature">Văn học</option>
                        <option value="science">Khoa học</option>
                        <option value="art">Nghệ thuật</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Mô tả tác phẩm</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="4"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    ></textarea>
                </div>
            </div>
        </div>
    );

    const renderPasswordForm = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                    <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Mật khẩu mới</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Top navigation tabs */}
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

                {/* Form content */}
                <div className="p-8">
                    <form onSubmit={handleSubmit}>
                        {activeTab === 'profile' && renderProfileForm()}{' '}
                        {activeTab === 'copyright' && renderCopyrightForm()}
                        {activeTab === 'password' && renderPasswordForm()}
                        <div className="mt-8">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02]"
                            >
                                {activeTab === 'profile' && 'Cập nhật thông tin'}
                                {activeTab === 'copyright' && 'Đăng ký bản quyền'}
                                {activeTab === 'password' && 'Đổi mật khẩu'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FromBaoMatTaiKhoan;
