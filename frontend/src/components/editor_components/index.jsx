import { Edit2, Plus, Trash2, Upload } from "lucide-react";
import { useState } from "react";

const DashboardStats = ({ stats }) => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white shadow rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
          <div className={`mt-2 flex items-center text-sm ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <span>{stat.change}%</span>
            <span className="ml-2">so với tháng trước</span>
          </div>
        </div>
      ))}
    </div>
  );

const CategoryManagement = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Kinh tế', description: 'Các bài viết về kinh tế' },
    { id: 2, name: 'Chính trị', description: 'Các bài viết về chính trị' },
    { id: 3, name: 'Công nghệ', description: 'Các bài viết về công nghệ' }
  ]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const handleAddCategory = () => {
    if (!newCategory.name) return;
    setCategories([...categories, { ...newCategory, id: Date.now() }]);
    setNewCategory({ name: '', description: '' });
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Quản lý danh mục</h2>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Tên danh mục"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          placeholder="Mô tả"
          value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <button onClick={handleAddCategory} className="bg-blue-500 text-white rounded p-2">
          <Plus className="w-4 h-4 mr-1 inline-block" />
          Thêm
        </button>
      </div>
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium">{category.name}</h4>
              <p className="text-sm text-gray-500">{category.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setEditingId(category.id)} className="border rounded p-2">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => handleDeleteCategory(category.id)} className="border rounded p-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ArticleForm = ({ categories }) => {
  const [article, setArticle] = useState({
    title: '',
    abstract: '',
    category: '',
    file: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting article:', article);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Đăng bài báo mới</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Tiêu đề bài báo"
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
          className="border rounded p-2 w-full"
        />
        <textarea
          placeholder="Tóm tắt bài báo"
          value={article.abstract}
          onChange={(e) => setArticle({ ...article, abstract: e.target.value })}
          rows={4}
          className="border rounded p-2 w-full"
        />
        <select
          value={article.category}
          onChange={(e) => setArticle({ ...article, category: e.target.value })}
          className="border rounded p-2 w-full"
        >
          <option value="">Chọn danh mục</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <label className="text-blue-600 cursor-pointer">
              <span>Tải lên file PDF</span>
              <input
                type="file"
                className="sr-only"
                accept=".pdf"
                onChange={(e) => setArticle({ ...article, file: e.target.files[0] })}
              />
            </label>
            <p className="text-xs text-gray-500">PDF tối đa 10MB</p>
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white rounded p-2 mt-4">
          Đăng bài
        </button>
      </form>
    </div>
  );
};

export { ArticleForm, CategoryManagement, DashboardStats };

