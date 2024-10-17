
import DefaultLayout from '@/layouts/DefautLayouts';
import { privateRoutes, publicRoutes } from '@/Routes';
import ProtectedRoute from '@/Routes/privateRoute';
import { Fragment } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className="App bg-blue-100">
                <Routes>
                    {/* Routes công khai */}
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        
                        if (route.layout) {
                            Layout = route.layout;
                        }
                        if (route.layout === null) {
                            Layout = Fragment;
                        }
                        
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}

                    {/* Routes được bảo vệ */}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        
                        if (route.layout) {
                            Layout = route.layout;
                        }
                        if (route.layout === null) {
                            Layout = Fragment;
                        }
                        
                        return (
                            <Route
                                key={`private-${index}`}
                                path={route.path}
                                element={
                                    <ProtectedRoute allowedRoles={route.roles}>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </ProtectedRoute>
                                }
                            />
                        );
                    })}

                    {/* Chuyển hướng trang gốc về home */}
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    
                    {/* Route mặc định cho trang 404 */}
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;