// src/services/authService.js

const API_URL = 'https://congnghetoday.click';
const API_UPLOAD_FILE = 'https://anime404.click';
export const authService = {
    // Login user
    login: async (username, password) => {
        const response = await fetch(`${API_URL}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Đăng nhập thất bại');
        }

        return response.json();
    },

    // Get user details
    getUserDetails: async (token) => {
        const response = await fetch(`${API_URL}/api/user/get/userDetail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        });

        if (!response.ok) {
            // Success 202
            const error = await response.json();
            throw new Error(error.message || 'Không thể lấy thông tin người dùng');
        }

        return response.json();
    },
    // Register
    register: async (username, password, email, sdt, hovaten, url) => {
        const response = await fetch(`${API_URL}/api/user/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, email, sdt, hovaten, url }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw { data: error || 'Không thể đăng ký', status: response.status };
        }
        return response.json();
    },
    //Forgot Password
    forgot_pass: async (email) => {
        const response = await fetch(`${API_URL}/api/user/forgot?email=${email}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            console.log(error);
            throw new Error(error.message || 'Không thể gửi email đặt lại mật khẩu');
        }

        return response.json();
    },
    //Change Password
    change_pass: async (username, password, confirmPassword) => {
        const response = await fetch(`${API_URL}/api/user/changepassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, confirmPassword }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể thay đổi');
        }
        return response.json();
    },
    //Reset Pass
    resetPass: async (token, newpassword) => {
        const response = await fetch(`${API_URL}/api/user/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, newpassword }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể thay đổi');
        }
        return response.json();
    },

    //Verify
    verify: async (code) => {
        const response = await fetch(`${API_URL}/api/user/verify?code=${code}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể thay đổi');
        }

        return response.json();
    },
    //Google Login
    googleLogin: async (name, sub, email, picture, verified_email) => {
        const response = await fetch(`${API_URL}/api/user/login/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, sub, email, picture, verified_email }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể lưu');
        }
        return response.json();
    },
    //List Bài Báo
    getAllBaiBao: async () => {
        const response = await fetch(`${API_URL}/api/baibao/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi khi load bài báo');
        }
        return response.json();
    },

    //Danh mục theo tuần
    getAllDanhMuc: async () => {
        const response = await fetch(`${API_URL}/api/danhmuc/get/week`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể load danh mục');
        }
        return response.json();
    },

    // Thể loại
    getAllTheLoai: async () => {
        const response = await fetch(`${API_URL}/api/theloai/all`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể load thể loại');
        }
        return response.json();
    },
    // Gửi bài
    createBaiBao: async (theloaiId, tenbaibao, noidung, tukhoa, url, file, token) => {
        const response = await fetch(`${API_URL}/api/baibao/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(theloaiId, tenbaibao, noidung, tukhoa, url, file, token),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể gửi bài');
        }
        return response.json();
    },

    uploadFile: async (formData) => {
        const response = await fetch(`https://anime404.click/api/files/upload`, {
            method: 'POST',
            body: formData,
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể gửi bài');
        }
        return response.json();
    },
    // Thêm bài báo
    createDanhMuc: async (tieuDe, mota, url, tuan, so) => {
        const response = await fetch(`${API_URL}/api/danhmuc/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tieuDe, mota, url, tuan, so),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể gửi bài');
        }
        return response.json();
    },
    // Đổi mật khẩu
    changePassword: async ({ username, password, newpassword }) => {
        const response = await fetch(`${API_URL}/api/user/changepassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, newpassword }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Cannot change password');
        }
        return response.json();
    },
    //Load bài báo all
    loadBaibaoByUser: async(token) => {
        const response = await fetch(`${API_URL}/api/baibao/get/baibao/author`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(token)
        })
        if(!response.ok){
            const error = await response.json()
            throw new Error(error.message || "Cant fetch list Bai Bao")
        }
        return response.json()
    },
    //Editor Load Data
    loadBaibaoForEditor: async(token) => {
        const response = await fetch(`${API_URL}/api/baibao/get/baibao/all/editor`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(token)
        })
        if(!response.ok){
            const error = await response.json()
            throw new Error(error.message || "Cant fetch list Bai Bao")
        }
        return response.json()
    },
    //Editor Load Data
    getUserKiemDuyet: async(token) => {
        const response = await fetch(`${API_URL}/api/user/get/taikhoan/kiemduyet`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({token})
        })
        if(!response.ok){
            const error = await response.json()
            throw new Error(error.message || "Cant fetch list Nguoi Kiem Duyet")
        }
        return response.json()
    },
    //Phân kiểm duyệt
    addCensor: async(taikhoanId, baobaiId, ghichu, token) => {
        const response = await fetch(`${API_URL}/api/censor/create`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(taikhoanId, baobaiId, ghichu, token)
        })
        if(!response.ok){
            const error = await response.json()
            throw new Error(error.message || "Không thể thêm người kiểm duyệt")
        }
        return response.json()
    },
    //Update thông tin người dùng
    updateUser: async (hovaten, username, sdt, url, token) => {
        const response = await fetch(`${API_URL}/api/user/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hovaten, username, sdt, url, token), // Chuyển đổi đúng cú pháp
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể sửa thông tin người dùng');
        }

        return response.json();
    },
    //Load Danh Sách cho Censor
    loadDanhSachForCensor: async (token) => {
        const response = await fetch(`${API_URL}/api/censor/get/kiemduyet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token}), 
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể sửa load danh sách cho kiểm duyệt');
        }

        return response.json();
    },
    //Duyệt bài viết Censor
    duyetBaiBao: async(token, status, ghichu, kiemduyetId) => {
        const response = await fetch(`${API_URL}/api/censor/update`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(token, status, ghichu, kiemduyetId)
        })
        if(!response.ok) {
            const error = await response.json()
            throw new Error(error.message || "Lỗi khi duyệt bài báo")
        }
        return response.json()
    }
};
