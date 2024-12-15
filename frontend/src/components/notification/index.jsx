import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

const NotificationComponent = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mô phỏng việc lấy thông báo từ API
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Thay thế bằng API call thực tế
                const response = await fetch('/api/notifications');
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error('Error fetching notifications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    if (loading) {
        return <div className="p-4">Đang tải thông báo...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
                <Bell className="w-6 h-6" />
                <h2 className="text-2xl font-semibold">Thông báo</h2>
            </div>

            <div className="space-y-4">
                {notifications.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        Không có thông báo mới
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium">{notification.title}</h3>
                                    <p className="text-gray-600 mt-1">{notification.message}</p>
                                </div>
                                <span className="text-sm text-gray-500">
                                    {new Date(notification.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default NotificationComponent;