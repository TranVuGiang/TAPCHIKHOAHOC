import { SuccessDialog } from "@/components/modalDialog";
import { authService } from "@/utils/authService";
import { useEffect, useState } from "react";

const ProfileForm = ({ userDetail }) => {
    const [formData, setFormData] = useState({
      fullname: '',
      phone: '',
      url: null,
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState(null);
    const [isSuccess, setIsSuccess] = useState(false);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setFile(file);
      }
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
  
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    };
  
    const validateForm = () => {
      const newErrors = {};
  
      if (!formData.fullname || formData.fullname.trim() === '') {
        newErrors.fullname = 'Vui lòng nhập họ và tên';
      }
  
      if (!formData.phone || !/^[0-9]{10,11}$/.test(formData.phone)) {
        newErrors.phone = 'Số điện thoại không hợp lệ';
      }
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateForm()) return;
      setIsSubmitting(true);
  
      try {
        let uploadFile = formData.url;
        if (file) {
          const formImage = new FormData();
          formImage.append('files', file);
          const response = await authService.uploadFile(formImage);
          uploadFile = response.file;
        }
  
        const current = JSON.parse(localStorage.getItem('currentUser'));
        const response = await authService.updateUser({
          hovaten: formData.fullname,
          sdt: formData.phone,
          url: uploadFile,
          token: current.token,
        });
  
        setIsSuccess(true);
        console.log(response);
        window.location.reload();
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    };
  
    useEffect(() => {
      if (userDetail) {
        setFormData({
          fullname: userDetail.fullname || '',
          phone: userDetail.phone || '',
          url: userDetail.url || null,
        });
      }
    }, [userDetail]);
  
    return (
      <>
        <SuccessDialog
          isOpen={isSuccess}
          onClose={() => setIsSuccess(false)}
          title="Thay đổi thành công"
          titleButton="Tiếp tục"
        />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Ảnh đại diện</label>
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {formData.url ? (
                  <img
                    src={
                      typeof formData.url === 'string'
                        ? formData.url
                        : URL.createObjectURL(formData.url)
                    }
                    alt="Preview"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400">No image</span>
                )}
              </div>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="block w-full sm:w-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Họ và tên</label>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.fullname ? 'border-red-500' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
              />
              {errors.fullname && <p className="text-red-500 text-xs mt-1">{errors.fullname}</p>}
            </div>
  
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 rounded-lg border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } focus:border-blue-500 focus:ring-2 focus:ring-blue-200`}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tên đăng nhập</label>
              <input
                type="text"
                name="username"
                value={userDetail.username}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 focus:ring-0"
                disabled
              />
            </div>
  
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={userDetail.email}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 focus:ring-0"
                disabled
              />
            </div>
          </div>
  
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors duration-200`}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Lưu thông tin'}
          </button>
        </form>
      </>
    );
  };
  
  export default ProfileForm;
  