
const CopyrightForm = ({ formData, handleInputChange }) => {
  return (
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
};

export default CopyrightForm;