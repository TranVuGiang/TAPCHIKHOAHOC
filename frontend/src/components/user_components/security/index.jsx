import { useEffect, useState } from 'react';
import RenderPasswordForm from './changpassword';
import ProfileForm from './changProfile';
import NavigationTabs from './navigationTabs';
import CopyrightForm from './xinquyen';


const FormBaoMatTaiKhoan = ({userDetail}) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    setFormData(userDetail)
  }, [userDetail])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      avatar: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="p-8">
            {activeTab === 'profile' && (
              <ProfileForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleFileChange={handleFileChange}
              />
            )}
            {activeTab === 'copyright' && (
              <CopyrightForm
                formData={formData}
                handleInputChange={handleInputChange}
              />
            )}
            {activeTab === 'password' && <RenderPasswordForm username={formData.username} />}

        </div>
      </div>
    </div>
  );
};

export default FormBaoMatTaiKhoan;