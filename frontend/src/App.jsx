import LoadingSpinner from '@/components/LoadingSpinner';
import NoAccess from '@/components/noAcess';
import { privateRoutes, publicRoutes } from '@/Routes/index';
import ProtectedRoute from '@/Routes/privateRoute';
import { Fragment, Suspense } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DefaultLayout from './layouts/DefautLayouts';

function App() {
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
