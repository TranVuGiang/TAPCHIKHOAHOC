function Editor_Notification({thongBaoData}) {
    return ( 
        <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Thông báo gần đây</h2>
            <div className="space-y-4">
                {thongBaoData.map(item => (
                    <div 
                        key={item.id} 
                        className={`flex items-center justify-between p-4 rounded-lg ${
                            item.type === 'success' ? 'bg-green-50' : 'bg-yellow-50'
                        }`}
                    >
                        <div className="flex items-center space-x-4">
                            <div className={`w-2 h-2 rounded-full ${
                                item.type === 'success' ? 'bg-green-500' : 'bg-yellow-500'
                            }`}></div>
                            <span className="text-gray-700">{item.message}</span>
                        </div>
                        <span className="text-sm text-gray-500">{item.time}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
     );
}

export default Editor_Notification;