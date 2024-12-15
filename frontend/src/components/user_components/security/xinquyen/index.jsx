
const CopyrightForm = ({ formData, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        

        <div className="space-y-6">
          <label className="text-md font-medium text-gray-700">Yêu cầu xin quyền</label>
          <select
            name="workType"
            value={formData.workType}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="">Chọn quyền</option>
            <option value="author">Tác giả</option>

          </select>
          <button className="w-full px-3 py-3 bg-space-300 text-white rounded-xl">
            Gửi yêu cầu
          </button>
        </div>

       
      </div>
    </div>
  );
};

export default CopyrightForm;