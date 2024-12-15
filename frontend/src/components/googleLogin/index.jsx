import { authService } from '@/utils/authService';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ErrorDialog, SuccessDialog } from '../modalDialog';

const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [successLogin, setSuccessLogin] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');

    const handleCredentialResponse = useCallback(async (response) => {
        try {
            const tokenInfo = await fetch(
                `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${response.credential}`,
            );
            if (!tokenInfo.ok) throw new Error('Network response was not ok');
            await GoogleLogin(response.credential);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setError(true);
            setDialogMessage('Không thể xác thực thông tin đăng nhập Google');
        }
    }, []);

    const GoogleLogin = async (credential) => {
        
        try {
            const loginResponse = await authService.googleLogin({credential: credential});
            const token = loginResponse.data.token;
            const roles = loginResponse.data.roles;
            const fullname = loginResponse.data.fullname;

            localStorage.setItem(
                'currentUser',
                JSON.stringify({
                    fullname: fullname,
                    roles: roles,
                    token: token,
                }),
            );

            // Hiển thị thông báo thành công
            setSuccessLogin(true);
            setDialogMessage(`Xin chào ${fullname}! Đăng nhập thành công`);

            // Delay navigation để người dùng có thể thấy thông báo
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            setError(true);
            setDialogMessage('Đăng nhập thất bại. Vui lòng thử lại');
            console.log(error);
        }
    };

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: '269675276366-cgk7jb5qfo73k2dpjme0jbqlf91fv0h0.apps.googleusercontent.com',
                    callback: handleCredentialResponse,
                });

                window.google.accounts.id.renderButton(document.getElementById('google-login'), {
                    type: 'standard',
                    theme: 'outline',
                    size: 'large',
                    text: 'signin_with',
                    shape: 'rectangular',
                    logo_alignment: 'left',
                    width: '100%',
                });
            }
        };

        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = initializeGoogleSignIn;
        document.head.appendChild(script);

        return () => {
            const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
            if (script) {
                document.head.removeChild(script);
            }
        };
    }, [handleCredentialResponse]);

    const handleCloseSuccess = () => {
        setSuccessLogin(false);
        navigate('/');
    };


    return (
        <div className="w-full">
            <div
                id="google-login"
                className="my-5 rounded-xl [&>div]:!rounded-lg [&>div]:!w-full [&>div]:!h-10 [&>div]:!border [&>div]:hover:!bg-gray-200 [&>div]:!transition [&>div]:!duration-300"
            />
            {error && <ErrorDialog title={dialogMessage || 'Đăng nhập thất bại'} />}
            <SuccessDialog
                isOpen={successLogin}
                onClose={handleCloseSuccess}
                title={dialogMessage || 'Đăng nhập thành công'}
                titleButton={'Tiếp tục'}
            />
        </div>
    );
};

export default GoogleLoginButton;
