
const ProfileForm = ({ formData, handleInputChange, handleFileChange }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {formData.avatar ? (
              <img
                src={URL.createObjectURL(formData.avatar)}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-gray-400">No image</span>
            )}
          </div>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Họ và tên</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">URL</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;