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
    // Lấy bài báo theo Id
    getBaiBaoById: async (page, size) => {
        const response = await fetch(`${API_URL}/api/baibao/all?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể load bài báo');
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
    createBaiBao: async (theloai_id, tenbaibao, noidung, tukhoa, url_file) => {
        const response = await fetch(`${API_URL}/api/baibao/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ theloai_id, tenbaibao, noidung, tukhoa, url_file }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể gửi bài');
        }
        return response.json();
    },
    // Tải tệp lên máy chủ
    uploadFile: async (formData) => {
        try {
            const response = await fetch(`https://anime404.click/api/files/upload`, {
                method: 'POST',
                body: formData,
            });

            // Kiểm tra mã trạng thái HTTP của phản hồi
            if (!response.ok) {
                // Kiểm tra loại phản hồi và trả về lỗi phù hợp
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Upload failed');
                } else {
                    const errorText = await response.text();
                    throw new Error(errorText || 'Upload failed');
                }
            }

            // Xử lý phản hồi thành công
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                // Nếu là JSON, chuyển đổi sang object
                const data = await response.json();
                return data;
            } else {
                // Nếu là text, trả về text
                const textData = await response.text();
                return textData;
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    },
};
