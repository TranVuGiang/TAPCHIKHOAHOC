// src/services/authService.js

const API_URL = 'http://localhost:9000';
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
    googleLogin: async (credential) => {
        const response = await fetch(`${API_URL}/api/user/login/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credential),
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
    getAllDanhMuc: async (pageSize, totalPage) => {
        const response = await fetch(`${API_URL}/api/danhmuc/get/week`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pageSize, totalPage),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể load danh mục');
        }
        return response.json();
    },
    //getAllDanhMuc mọi thời gian
    getAllDanhMucByTime: async (token) => {
        const response = await fetch(`${API_URL}/api/danhmuc/all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể load danh mục');
        }
        return response.json();
    },
    getAllDanhMucByTimePhanTrang: async (token, page, size) => {
        const response = await fetch(`${API_URL}/api/danhmuc/all?page=${page}&size=${size}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token),
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
    createBaiBao: async (baibaoId, theloaiId, tenbaibao, noidung, tukhoa, url, file, token) => {
        const response = await fetch(`${API_URL}/api/baibao/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(baibaoId, theloaiId, tenbaibao, noidung, tukhoa, url, file, token),
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
    createDanhMuc: async (tieuDe, mota, url, tuan, so, token) => {
        const response = await fetch(`${API_URL}/api/danhmuc/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(tieuDe, mota, url, tuan, so, token),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể gửi bài');
        }
        return response.json();
    },
    updateDanhMuc: async (danhmucId, tieuDe, mota, url, tuan, so, token) => {
        const response = await fetch(`${API_URL}/api/danhmuc/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(danhmucId, tieuDe, mota, url, tuan, so, token),
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
    loadBaibaoByUser: async (token) => {
        const response = await fetch(`${API_URL}/api/baibao/get/baibao/author`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Cant fetch list Bai Bao');
        }
        return response.json();
    },
    //Editor Load Data
    loadBaibaoForEditor: async (token) => {
        const response = await fetch(`${API_URL}/api/baibao/get/baibao/all/editor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Cant fetch list Bai Bao');
        }
        return response.json();
    },
    //Editor Load Data
    getUserKiemDuyet: async (token) => {
        const response = await fetch(`${API_URL}/api/user/get/taikhoan/kiemduyet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Cant fetch list Nguoi Kiem Duyet');
        }
        return response.json();
    },
    //Phân kiểm duyệt
    addCensor: async (taikhoanId, baobaiId, ghichu, token) => {
        const response = await fetch(`${API_URL}/api/censor/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taikhoanId, baobaiId, ghichu, token),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể thêm người kiểm duyệt');
        }
        return response.json();
    },
    //Update thông tin người dùng
    updateUser: async (hovaten, sdt, url, token) => {
        const response = await fetch(`${API_URL}/api/user/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(hovaten, sdt, url, token), // Chuyển đổi đúng cú pháp
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
            body: JSON.stringify({ token }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Không thể sửa load danh sách cho kiểm duyệt');
        }

        return response.json();
    },
    //Duyệt bài viết Censor
    duyetBaiBao: async (token, status, ghichu, kiemduyetId) => {
        const response = await fetch(`${API_URL}/api/censor/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token, status, ghichu, kiemduyetId),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi khi duyệt bài báo');
        }
        return response.json();
    },
    //Duyệt bài viết Censor
    phanhoiTacGia: async (token, status, ghichu, kiemduyetId) => {
        const response = await fetch(`${API_URL}/api/censor/update/kiemduyet/baibao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token, status, ghichu, kiemduyetId),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi khi duyệt bài báo');
        }
        return response.json();
    },
    // Check hạn sử dụng token
    checkToken: async (token) => {
        const response = await fetch(`${API_URL}/api/user/check`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi khi check Token');
        }
        return response.json();
    },
    // Đăng bài
    dangBai: async (token, baibaoId, danhmucId) => {
        const response = await fetch(`${API_URL}/api/danhmuc/add/baibao/danhmuc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token, baibaoId, danhmucId),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi khi check Token');
        }
        return response.json();
    },
    // Thích bài viết
    likeBaibao: async (token, baibaoId, status) => {
        const response = await fetch(`${API_URL}/api/like/add/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token, baibaoId, status),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi khi không thể like');
        }
        return response.json();
    },
    // Comment bai viet
    saveComment: async (token, baibaoId, noidung) => {
        const response = await fetch(`${API_URL}/api/binhluan/add/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token, baibaoId, noidung),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể thêm baibao');
        }
        return response.json();
    },
    // Xóa comment
    deleteComment: async (token, baibaoId) => {
        const response = await fetch(`${API_URL}/api/binhluan/remove/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token, baibaoId),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể thêm baibao');
        }
        return response.json();
    },
    // load User by Admin
    loadUserByAdmin: async (token) => {
        const response = await fetch(`${API_URL}/api/admin/get/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể load user');
        }
        return response.json();
    },
    loadUserByAdminPhanTrang: async (token, page, size) => {
        const response = await fetch(`${API_URL}/api/admin/get/user?page=${page}&size=${size}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể load user');
        }
        return response.json();
    },
    loadRoleByAdmin: async (token) => {
        const response = await fetch(`${API_URL}/api/admin/get/role`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi');
        }
        return response.json();
    },
    addRolesByAdmin: async (token, taikhoanId, role) => {
        const response = await fetch(`${API_URL}/api/admin/add/user/role`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token, taikhoanId, role),
        });
        if (!response.ok) {
            const error = await response.json();
            console.log(error);

            throw new Error(error || 'Lỗi');
        }
        return response.json();
    },
    removeRolesByAdmin: async (token, taikhoanId, role) => {
        const response = await fetch(`${API_URL}/api/admin/remove/user/role`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token, taikhoanId, role),
        });
        if (!response.ok) {
            const error = await response.json();
            console.log(error);

            throw new Error(error || 'Lỗi không thể xóa');
        }
        return response.json();
    },
    updateStatusUser: async (token, status, taikhoanId) => {
        const response = await fetch(`${API_URL}/api/admin/update/user/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token, status, taikhoanId),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể xóa');
        }
        return response.json();
    },
    loadQC: async (token) => {
        const response = await fetch(`${API_URL}/api/bgqc/get/all`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể xóa');
        }
        return response.json();
    },

    taoHopDong: async (token, bgqcid) => {
        const response = await fetch(`${API_URL}/contract/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token, bgqcid),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi tạo hợp đồng');
        }
        return response.json();
    },
    taoThanhToan: async (productName, description, price, token, hopdong_id, bgqcId) => {
        const response = await fetch(`${API_URL}/order/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productName, description, price, token, hopdong_id, bgqcId }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi tạo thanh toán');
        }
        return response.json();
    },
    checkThanhToan: async () => {
        const response = await fetch(`${API_URL}/order/cancel`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi tạo thanh toán');
        }
        return response.json();
    },
    loadThongkeByAdmin: async (token) => {
        const response = await fetch(`${API_URL}/api/admin/get/thongke`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể fetch Thống kê');
        }
        return response.json();
    },
    loadBaibaoByAdmin: async (token) => {
        const response = await fetch(`${API_URL}/api/admin/get/baibao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể fetch bài báo theo admin');
        }
        return response.json();
    },
    updateStatusBaiBaoByAdmin: async (token, baibaoId, status) => {
        const response = await fetch(`${API_URL}/api/admin/update/baibao/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, baibaoId, status }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể update bài báo');
        }
        return response.json();
    },
    baibaoDathich: async (token) => {
        const response = await fetch(`${API_URL}/api/like/get/user/like`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể load bài báo đã thích');
        }
        return response.json();
    },
    baibaoDaXem: async (token) => {
        const response = await fetch(`${API_URL}/api/like/get/user/daxem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể load bài báo đã xem');
        }
        return response.json();
    },

    quangcaoAdmin: async (token) => {
        const response = await fetch(`${API_URL}/api/admin/get/quangcao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể load bài báo đã xem');
        }
        return response.json();
    },
    updateQuangcaoAdmin: async (token, quangcaoId, status) => {
        const response = await fetch(`${API_URL}/api/admin/update/quangcao/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, quangcaoId, status }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể load bài báo đã xem');
        }
        return response.json();
    },
    dangQuangCao: async () => {
        const response = await fetch(`${API_URL}/api/quangcao/get/quangcao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể load bài báo đã xem');
        }
        return response.json();
    },

    clickQuangCao: async (quangcaoId) => {
        const response = await fetch(`${API_URL}/api/quangcao/add/click/quangcao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quangcaoId }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể');
        }
        return response.json();
    },
    xemQuangCao: async (quangcaoId) => {
        const response = await fetch(`${API_URL}/api/quangcao/add/xem/quangcao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quangcaoId }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể');
        }
        return response.json();
    },
    xinquyenAuthor: async (token) => {
        const response = await fetch(`${API_URL}/api/author/capquyen/author`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể');
        }
        return response.json();
    },
    getquyenAuthor: async (token) => {
        const response = await fetch(`${API_URL}/api/admin/get/user/capquyen`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể');
        }
        return response.json();
    },
    updatequyenAuthor: async (token, taikhoanId, status) => {
        const response = await fetch(`${API_URL}/api/admin/update/user/capquyen`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token, taikhoanId, status),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể');
        }
        return response.json();
    },
    loadQuangcaoByPatner: async (token) => {
        const response = await fetch(`${API_URL}/api/quangcao/get/user/quangcao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể');
        }
        return response.json();
    },
    updateQuangCao: async (token, quangcaoId, url, link, tieude) => {
        const response = await fetch(`${API_URL}/api/quangcao/update/user/quangcao`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(token, quangcaoId, url, link, tieude),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Lỗi không thể');
        }
        return response.json();
    },
};
