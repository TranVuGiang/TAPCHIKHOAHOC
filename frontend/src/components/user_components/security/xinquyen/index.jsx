import { authService } from "@/utils/authService";

const CopyrightForm = ({ formData }) => {

  const handleXinquyen = async () => {
    const current = JSON.parse(localStorage.getItem('currentUser'))
    const token = current.token;
    try {
      const resp = await authService.xinquyenAuthor(token)
      console.log(resp)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        

        <div className="space-y-6">
          <label className="text-xl font-medium text-gray-700 text-center">Yêu cầu xin quyền tác giả</label>

          <button onClick={handleXinquyen} className="w-full px-3 py-3 bg-space-300 text-white rounded-xl">
            Gửi yêu cầu
          </button>
        </div>

       
      </div>
    </div>
  );
};

export default CopyrightForm;