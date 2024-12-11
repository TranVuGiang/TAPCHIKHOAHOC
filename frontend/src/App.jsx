import LoadingSpinner from '@/components/LoadingSpinner';
import NoAccess from '@/components/noAcess';
import { privateRoutes, publicRoutes } from '@/Routes/index';
import ProtectedRoute from '@/Routes/privateRoute';
import { Fragment, Suspense, useEffect } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/DefautLayouts';
import { authService } from './utils/authService';

function App() {
    useEffect(() => {
        checkToken();
    }, []);
    const checkToken = async () => {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            try {
                const arr = JSON.parse(currentUser);
                if (arr.token && arr.token.length > 10) {
                    try {
                        const response = await authService.checkToken(arr.token);
                        if (!response.success) {
                            localStorage.removeItem('currentUser');
                        }
                    } catch (error) {
                        console.error("Lỗi khi xác thực token:", error);
                        localStorage.removeItem('currentUser');
                    }
                } else {
                    console.warn("Token không tồn tại hoặc không hợp lệ.");
                    localStorage.removeItem('currentUser');
                }
            } catch (error) {
                console.error("Dữ liệu currentUser không hợp lệ:", error);
                localStorage.removeItem('currentUser');
            }
        }
    };
    

    return (
        <Router>
            <div className="App bg-blue-100">
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        {/* Public Routes */}
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = route.layout || DefaultLayout;
                            Layout = Layout === null ? Fragment : Layout;
                            return (
                                <Route
                                    key={`public-${index}`}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Suspense fallback={<LoadingSpinner />}>
                                                <Page />
                                            </Suspense>
                                        </Layout>
                                    }
                                />
                            );
                        })}

                        {/* Protected Routes */}
                        {privateRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = route.layout || DefaultLayout;
                            Layout = Layout === null ? Fragment : Layout;
                            return (
                                <Route
                                    key={`private-${index}`}
                                    path={route.path}
                                    element={
                                        <ProtectedRoute allowedRoles={route.roles}>
                                            <Layout>
                                                <Suspense fallback={<LoadingSpinner />}>
                                                    <Page />
                                                </Suspense>
                                            </Layout>
                                        </ProtectedRoute>
                                    }
                                />
                            );
                        })}

                        {/* Redirect Routes */}
                        <Route path="/" element={<Navigate to="/home" replace />} />
                        <Route path="/no-access" element={<NoAccess />} />
                        <Route path="*" element={<Navigate to="/home" replace />} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
}

export default App;
