import { useEffect, useState } from 'react';
import RenderPasswordForm from './changpassword';
import ProfileForm from './changProfile';
import NavigationTabs from './navigationTabs';
import CopyrightForm from './xinquyen';

const FormBaoMatTaiKhoan = ({ userDetail }) => {
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        setFormData(userDetail);
    }, [userDetail]);

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
        <>
            {/* Navigation Tabs */}
            <div className="flex flex-col sm:flex-row border-b">
                <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>

            {/* Form Content */}
            <div className="p-6 sm:p-8">
                {activeTab === 'profile' && <ProfileForm userDetail={formData} />}
                {activeTab === 'copyright' && (
                    <CopyrightForm formData={formData} handleInputChange={handleInputChange} />
                )}
                {activeTab === 'password' && <RenderPasswordForm username={formData.username} />}
            </div>
        </>
    );
};

export default FormBaoMatTaiKhoan;
