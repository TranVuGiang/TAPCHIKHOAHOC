import React, { useState } from 'react';
import { Calendar, Upload } from 'lucide-react';
import { format } from 'date-fns';

const AdRegistrationForm = () => {
    const [packages, setPackages] = useState([
        { id: 1, name: "Gói Cơ Bản - 7 ngày", days: 7, price: 500000 },
        { id: 2, name: "Gói Tiêu Chuẩn - 30 ngày", days: 30, price: 1800000 },
        { id: 3, name: "Gói Premium - 90 ngày", days: 90, price: 4500000 },
    ]);

    const [formData, setFormData] = useState({
        title: '',
        url: '',
        bannerImage: null,
        packageId: '',
        startDate: format(new Date(), 'yyyy-MM-dd'),
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Vui lòng nhập tiêu đề quảng cáo';
        }

        if (!formData.url.trim()) {
            newErrors.url = 'Vui lòng nhập URL đích';
        } else if (!/^(http|https):\/\/[^ "]+$/.test(formData.url)) {
            newErrors.url = 'URL không hợp lệ';
        }

        if (!formData.bannerImage) {
            newErrors.bannerImage = 'Vui lòng tải lên banner quảng cáo';
        }

        if (!formData.packageId) {
            newErrors.packageId = 'Vui lòng chọn gói quảng cáo';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (validateForm()) {
            try {
                // Giả lập API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                setSubmitStatus('success');
                // Reset form sau khi thành công
                setFormData({
                    title: '',
                    url: '',
                    bannerImage: null,
                    packageId: '',
                    startDate: format(new Date(), 'yyyy-MM-dd'),
                });
            } catch (error) {
                setSubmitStatus('error');
            }
        }

        setIsSubmitting(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const selectedPackage = formData.packageId ?
        packages.find(pkg => pkg.id === parseInt(formData.packageId)) : null;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Đăng ký Quảng cáo</h1>
                    <p className="text-gray-600 mb-6">Điền thông tin chi tiết về quảng cáo của bạn</p>

                    {submitStatus === 'success' && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
                            <p className="text-green-800">
                                Đăng ký quảng cáo thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.
                            </p>
                        </div>
                    )}

                    {submitStatus === 'error' && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-red-800">
                                Có lỗi xảy ra. Vui lòng thử lại sau.
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Tiêu đề quảng cáo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tiêu đề quảng cáo
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${
                                    errors.title ? 'border-red-300' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="Nhập tiêu đề quảng cáo"
                            />
                            {errors.title && (
                                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                            )}
                        </div>

                        {/* URL đích */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                URL đích
                            </label>
                            <input
                                type="url"
                                name="url"
                                value={formData.url}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${
                                    errors.url ? 'border-red-300' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                placeholder="https://..."
                            />
                            {errors.url && (
                                <p className="mt-1 text-sm text-red-600">{errors.url}</p>
                            )}
                        </div>

                        {/* Upload banner */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Banner quảng cáo
                            </label>
                            <div
                                className={`mt-1 flex justify-center px-6 py-4 border-2 border-dashed rounded-md ${
                                    errors.bannerImage ? 'border-red-300' : 'border-gray-300'
                                } hover:border-gray-400 transition-colors cursor-pointer`}
                                onClick={() => document.querySelector('input[type="file"]').click()}
                            >
                                <div className="text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600">
                                            Kéo thả file hoặc click để tải lên
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            PNG, JPG, GIF tối đa 5MB
                                        </p>
                                    </div>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            bannerImage: e.target.files[0]
                                        }));
                                        if (errors.bannerImage) {
                                            setErrors(prev => ({
                                                ...prev,
                                                bannerImage: ''
                                            }));
                                        }
                                    }}
                                />
                            </div>
                            {errors.bannerImage && (
                                <p className="mt-1 text-sm text-red-600">{errors.bannerImage}</p>
                            )}
                        </div>

                        {/* Gói quảng cáo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Chọn gói quảng cáo
                            </label>
                            <select
                                name="packageId"
                                value={formData.packageId}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-md ${
                                    errors.packageId ? 'border-red-300' : 'border-gray-300'
                                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            >
                                <option value="">-- Chọn gói --</option>
                                {packages.map(pkg => (
                                    <option key={pkg.id} value={pkg.id}>
                                        {pkg.name} - {pkg.price.toLocaleString('vi-VN')}đ
                                    </option>
                                ))}
                            </select>
                            {errors.packageId && (
                                <p className="mt-1 text-sm text-red-600">{errors.packageId}</p>
                            )}
                        </div>

                        {/* Ngày bắt đầu */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ngày bắt đầu
                            </label>
                            <div className="relative">
                                <input
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    min={format(new Date(), 'yyyy-MM-dd')}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Thông tin tổng kết */}
                        {selectedPackage && (
                            <div className="bg-gray-50 p-4 rounded-md">
                                <h3 className="font-medium text-gray-900 mb-2">Tổng kết đơn hàng</h3>
                                <div className="space-y-1 text-sm">
                                    <p className="flex justify-between">
                                        <span className="text-gray-600">Gói quảng cáo:</span>
                                        <span className="font-medium">{selectedPackage.name}</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="text-gray-600">Thời hạn:</span>
                                        <span className="font-medium">{selectedPackage.days} ngày</span>
                                    </p>
                                    <p className="flex justify-between text-lg font-medium mt-2 pt-2 border-t">
                                        <span>Tổng thanh toán:</span>
                                        <span className="text-blue-600">{selectedPackage.price.toLocaleString('vi-VN')}đ</span>
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-3 px-4 border border-transparent rounded-md text-white font-medium ${
                                isSubmitting
                                    ? 'bg-blue-400 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                            {isSubmitting ? 'Đang xử lý...' : 'Đăng ký ngay'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdRegistrationForm;