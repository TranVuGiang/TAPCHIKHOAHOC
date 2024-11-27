import { Book } from 'lucide-react';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
            <div className="text-center space-y-6 p-8 rounded-2xl">
                <div className="flex justify-center mb-4">
                    <Book 
                        className="w-24 h-24 text-blue-600 animate-pulse" 
                        strokeWidth={1.5}
                    />
                </div>
                <div className="flex justify-center space-x-2">
                    {[1, 2, 3].map((dot) => (
                        <div 
                            key={dot} 
                            className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: `${dot * 0.1}s` }}
                        ></div>
                    ))}
                </div>
                <h2 className="text-2xl font-semibold text-blue-700 mt-4">
                    Đang tải
                </h2>
            </div>
        </div>
    );
}

export default LoadingSpinner;