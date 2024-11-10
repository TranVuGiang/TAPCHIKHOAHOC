import { useEffect } from 'react';

const GoogleLoginButtons = () => {
    useEffect(() => {
        const loadGoogleScript = () => {
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            document.head.appendChild(script);

            script.onload = () => {
                if (window.google) {
                    window.google.accounts.id.initialize({
                        client_id: '269675276366-cgk7jb5qfo73k2dpjme0jbqlf91fv0h0.apps.googleusercontent.com',
                        callback: handleCredentialResponse,
                    });

                    // Render different button styles
                    window.google.accounts.id.renderButton(document.getElementById('standard-button'), {
                        theme: 'outline',
                        size: 'large',
                        text: 'continue_with',
                    });

                    window.google.accounts.id.renderButton(document.getElementById('icon-button'), {
                        theme: 'outline',
                        size: 'large',
                        type: 'icon',
                    });

                    window.google.accounts.id.renderButton(document.getElementById('dark-button'), {
                        theme: 'filled_black',
                        size: 'large',
                        text: 'signin_with',
                    });

                    window.google.accounts.id.renderButton(document.getElementById('custom-button'), {
                        theme: 'filled_blue',
                        size: 'large',
                        shape: 'rectangular',
                        logo_alignment: 'left',
                    });
                }
            };
        };

        loadGoogleScript();

        return () => {
            const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
            if (script) {
                document.head.removeChild(script);
            }
        };
    }, []);

    const data = (idToken) =>
        fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${idToken}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('User Info:', data);
                // data sẽ bao gồm các thông tin như email, name, picture, v.v.
            })
            .catch((error) => console.error('Error fetching user data:', error));
    const handleCredentialResponse = (response) => {
        console.log('Đăng nhập thành công!');
        console.log('Token:', response.credential);
        data(response.credential);
    };

    return (
        <div className="space-y-4">
            {/* <div className="p-4 border rounded-lg">
        <h3 className="mb-2 text-lg font-medium">Nút đăng nhập chuẩn</h3>
        <div id="standard-button"></div>
      </div>

      <div className="p-4 border rounded-lg">
        <h3 className="mb-2 text-lg font-medium">Nút chỉ có icon</h3>
        <div id="icon-button"></div>
      </div>

      <div className="p-4 border rounded-lg bg-gray-100">
        <h3 className="mb-2 text-lg font-medium">Nút tối màu</h3>
        <div id="dark-button"></div>
      </div> */}

            <div className="p-4 border rounded-lg">
                <h3 className="mb-2 text-lg font-medium">Nút tùy chỉnh</h3>
                <div id="custom-button"></div>
            </div>
        </div>
    );
};

export default GoogleLoginButtons;
