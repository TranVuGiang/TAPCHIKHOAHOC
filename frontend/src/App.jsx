import NoAccess from '@/components/noAcess';
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
                                        <Page />
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
                                            <Page />
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
            </div>
        </Router>
    );
}

export default App;