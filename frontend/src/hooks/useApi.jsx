// src/hooks/useApi.js
import { useState, useCallback } from 'react';

// Cấu hình API
export const API_CONFIG = {
    BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    TIMEOUT: 30000,
    DEFAULT_HEADERS: {
        'Content-Type': 'application/json',
        // Thêm các header mặc định khác ở đây
    }
};

// Enum cho các loại request
export const RequestType = {
    POST: 'POST',
    PUT: 'PUT',
};

// Custom hook để xử lý API requests
export const useApi = (initialLoading = false) => {
    const [loading, setLoading] = useState(initialLoading);
    const [error, setError] = useState(null);

    // Utility function để lấy token từ localStorage
    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    // Utility function để xử lý response
    const handleResponse = async (response) => {
        if (!response.ok) {
            // Xử lý các mã lỗi HTTP khác nhau
            switch (response.status) {
                case 401:
                    throw new Error('Unauthorized - Vui lòng đăng nhập lại');
                case 403:
                    throw new Error('Forbidden - Bạn không có quyền truy cập');
                case 404:
                    throw new Error('Not Found - Không tìm thấy tài nguyên');
                case 422:
                    const validationErrors = await response.json();
                    throw new Error(JSON.stringify(validationErrors));
                case 500:
                    throw new Error('Internal Server Error - Vui lòng thử lại sau');
                default:
                    throw new Error('Có lỗi xảy ra, vui lòng thử lại');
            }
        }
        return response.json();
    };

    // Function chính để thực hiện request
    const executeRequest = useCallback(async (
        url,
        method,
        data = null,
        customHeaders = {},
        customConfig = {}
    ) => {
        setLoading(true);
        setError(null);

        try {
            const authToken = getAuthToken();
            const fullUrl = url.startsWith('http') ? url : `${API_CONFIG.BASE_URL}${url}`;

            const requestConfig = {
                method,
                headers: {
                    ...API_CONFIG.DEFAULT_HEADERS,
                    ...(authToken && { Authorization: `Bearer ${authToken}` }),
                    ...customHeaders,
                },
                ...(data && { body: JSON.stringify(data) }),
                signal: AbortSignal.timeout(API_CONFIG.TIMEOUT),
                ...customConfig,
            };

            const response = await fetch(fullUrl, requestConfig);
            const result = await handleResponse(response);

            setLoading(false);
            return { success: true, data: result };

        } catch (err) {
            setError(err.message);
            setLoading(false);
            return { success: false, error: err.message };
        }
    }, []);

    // Wrapper function cho POST request
    const post = useCallback(async (url, data, headers = {}, config = {}) => {
        return executeRequest(url, RequestType.POST, data, headers, config);
    }, [executeRequest]);

    // Wrapper function cho PUT request
    const put = useCallback(async (url, data, headers = {}, config = {}) => {
        return executeRequest(url, RequestType.PUT, data, headers, config);
    }, [executeRequest]);

    return {
        loading,
        error,
        post,
        put,
    };
};

