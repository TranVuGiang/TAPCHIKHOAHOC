function Editor_DangBaiBao() {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm">
                <div className="p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-6">Đăng bài báo mới</h2>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề bài báo</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Nhập tiêu đề bài báo..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
                            <textarea
                                rows="8"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Nhập nội dung bài báo..."
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                            <input
                                type="url"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Nhập URL bài báo..."
                            />
                        </div>

                        <div className="flex justify-end space-x-4 pt-4">
                            <button
                                type="button"
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Hủy
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 border border-transparent rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Đăng bài
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Editor_DangBaiBao;
