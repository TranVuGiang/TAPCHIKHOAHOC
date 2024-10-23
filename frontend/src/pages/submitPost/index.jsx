import QuanLyBaiviet from '@/components/articleManagement';
import SubmissionForm from '@/components/submissionForm';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const TacGiaDashboard = () => {
    const [activeTab, setActiveTab] = useState('author'); // Default tab

    const renderContent = () => {
        switch (activeTab) {
            case 'submission':
                return <SubmissionForm />;
            case 'management':
                return <QuanLyBaiviet />;
            default:
                return <div className="p-4">Chào mừng bạn đến với trang tác giả</div>;
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-white font-montserrat min-h-screen">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-gray-800 text-white p-4">
                <nav>
                    <ul>
                        <li className="mb-2">
                            <button
                                onClick={() => setActiveTab('author')}
                                className={`w-full text-left p-2 rounded ${
                                    activeTab === 'author' ? 'bg-gray-700' : 'hover:bg-gray-700'
                                }`}
                            >
                                Tác giả
                            </button>
                        </li>
                        <li className="mb-2">
                            <button
                                onClick={() => setActiveTab('submission')}
                                className={`w-full text-left p-2 rounded ${
                                    activeTab === 'submission' ? 'bg-gray-700' : 'hover:bg-gray-700'
                                }`}
                            >
                                Gửi bài
                            </button>
                        </li>
                        <li className="mb-2">
                            <button
                                onClick={() => setActiveTab('management')}
                                className={`w-full text-left p-2 rounded ${
                                    activeTab === 'management' ? 'bg-gray-700' : 'hover:bg-gray-700'
                                }`}
                            >
                                Quản lý bài viết
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8">
                {renderContent()}
            </main>
        </div>
    );
};

export default TacGiaDashboard;