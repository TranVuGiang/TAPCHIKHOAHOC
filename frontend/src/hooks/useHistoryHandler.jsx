// hooks/useHistoryHandler.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useHistoryHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Xử lý khi người dùng nhấn nút back trên trình duyệt
    const handlePopState = (event) => {
      if (event.state) {
        // Chặn hành vi mặc định
        event.preventDefault();
        navigate(-1);
      }
    };

    // Xử lý khi người dùng reload trang
    const handleBeforeUnload = (event) => {
      // Lưu state hiện tại vào localStorage
      localStorage.setItem('lastRoute', window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);

  return null;
};

export default useHistoryHandler;