import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AdDashboard = () => {
    // Dữ liệu mẫu cho chiến dịch
    const [campaigns] = useState([
        {
            id: 1,
            name: "Summer Sale",
            budget: 5000,
            spent: 3200,
            impressions: 150000,
            clicks: 2500,
            conversions: 120
        },
        {
            id: 2,
            name: "Black Friday",
            budget: 8000,
            spent: 6500,
            impressions: 250000,
            clicks: 4200,
            conversions: 180
        }
    ]);

    // Dữ liệu mẫu cho banners
    const [banners] = useState([
        {
            id: 1,
            name: "Summer Collection Banner",
            image: "/banner1.jpg",
            size: "728x90",
            status: "active",
            placement: "Header",
            clicks: 1200,
            impressions: 45000,
            startDate: "2024-06-01",
            endDate: "2024-06-30"
        },
        {
            id: 2,
            name: "Promotion Side Banner",
            image: "/banner2.jpg",
            size: "300x600",
            status: "scheduled",
            placement: "Sidebar",
            clicks: 800,
            impressions: 30000,
            startDate: "2024-07-01",
            endDate: "2024-07-15"
        },
        {
            id: 3,
            name: "Holiday Special",
            image: "/banner3.jpg",
            size: "970x250",
            status: "inactive",
            placement: "Footer",
            clicks: 1500,
            impressions: 55000,
            startDate: "2024-12-01",
            endDate: "2024-12-25"
        }
    ]);

    const performanceData = [
        { name: 'Jan', clicks: 4000, impressions: 24000, cost: 2400 },
        { name: 'Feb', clicks: 3000, impressions: 18000, cost: 1800 },
        { name: 'Mar', clicks: 5000, impressions: 30000, cost: 3000 },
        { name: 'Apr', clicks: 2780, impressions: 16800, cost: 1680 },
        { name: 'May', clicks: 4890, impressions: 29400, cost: 2940 },
        { name: 'Jun', clicks: 3390, impressions: 20400, cost: 2040 },
    ];

    const calculateTotalMetrics = () => {
        return campaigns.reduce((acc, campaign) => ({
            totalBudget: acc.totalBudget + campaign.budget,
            totalSpent: acc.totalSpent + campaign.spent,
            totalImpressions: acc.totalImpressions + campaign.impressions,
            totalClicks: acc.totalClicks + campaign.clicks,
            totalConversions: acc.totalConversions + campaign.conversions
        }), {
            totalBudget: 0,
            totalSpent: 0,
            totalImpressions: 0,
            totalClicks: 0,
            totalConversions: 0
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800';
            case 'scheduled':
                return 'bg-blue-100 text-blue-800';
            case 'inactive':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const metrics = calculateTotalMetrics();

    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Quản lý Quảng cáo</h1>
                    <p className="text-gray-600 mt-1">Tổng quan hiệu quả chiến dịch</p>
                </div>

                {/* Navigation Tabs */}
                <div className="mb-6 border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`${
                                activeTab === 'overview'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
                        >
                            Tổng quan
                        </button>
                        <button
                            onClick={() => setActiveTab('banners')}
                            className={`${
                                activeTab === 'banners'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap pb-4 px-1 border-b-2 font-medium`}
                        >
                            Quản lý Banner
                        </button>
                    </nav>
                </div>

                {activeTab === 'overview' ? (
                    <>
                        {/* Thẻ thống kê */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                            {/* Chi phí */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-blue-100 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Tổng chi phí</p>
                                        <h3 className="text-2xl font-bold text-gray-900">${metrics.totalSpent.toLocaleString()}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Lượt xem */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-green-100 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Lượt xem</p>
                                        <h3 className="text-2xl font-bold text-gray-900">{metrics.totalImpressions.toLocaleString()}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Lượt click */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-purple-100 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Lượt click</p>
                                        <h3 className="text-2xl font-bold text-gray-900">{metrics.totalClicks.toLocaleString()}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Chuyển đổi */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-yellow-100 rounded-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Chuyển đổi</p>
                                        <h3 className="text-2xl font-bold text-gray-900">{metrics.totalConversions.toLocaleString()}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Biểu đồ hiệu suất */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
                            <div className="mb-4">
                                <h2 className="text-lg font-bold text-gray-800">Hiệu suất theo thời gian</h2>
                            </div>
                            <div className="h-[400px] w-full">
                                <LineChart
                                    width={800}
                                    height={400}
                                    data={performanceData}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
                                    <Line type="monotone" dataKey="impressions" stroke="#82ca9d" />
                                    <Line type="monotone" dataKey="cost" stroke="#ffc658" />
                                </LineChart>
                            </div>
                        </div>

                        {/* Danh sách chiến dịch */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-800">Chiến dịch đang chạy</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tên chiến dịch
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Ngân sách
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Chi tiêu
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Hiệu suất
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {campaigns.map((campaign) => (
                                        <tr key={campaign.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {campaign.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ${campaign.budget.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ${campaign.spent.toLocaleString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex items-center">
                                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                                        <div
                                                            className="bg-blue-600 h-2.5 rounded-full"
                                                            style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="ml-2">
                                                            {((campaign.spent / campaign.budget) * 100).toFixed(1)}%
                                                        </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                ) : (
                    /* Tab quản lý banner */
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold text-gray-800">Danh sách Banner</h2>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                    Thêm Banner mới
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Tên banner
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Kích thước
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Vị trí
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Hiệu suất
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thời gian
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {banners.map((banner) => (
                                    <tr key={banner.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <img
                                                    src="/api/placeholder/64/64"
                                                    alt={banner.name}
                                                    className="h-10 w-10 rounded-md object-cover"
                                                />
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{banner.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {banner.size}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(banner.status)}`}>
                                                    {banner.status}
                                                </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {banner.placement}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {banner.clicks.toLocaleString()} clicks
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {banner.impressions.toLocaleString()} impressions
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div>{new Date(banner.startDate).toLocaleDateString()}</div>
                                            <div>{new Date(banner.endDate).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-900 mr-4">
                                                Chỉnh sửa
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdDashboard;