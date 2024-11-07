// src/services/authService.js

const API_URL = 'https://anime404.click';

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
            body: JSON.stringify({token: token})

        });

        if (!response.ok) {
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
            throw new Error(error.message || 'Không thể đăng ký');
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
            body: JSON.stringify({username, password, confirmPassword})
        });
        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message || 'Không thể thay đổi');
        }
        return response.json()
    },
};
