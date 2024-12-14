// Routes/lazyComponents.js
import { lazy } from 'react';

// Layouts
// export const HeaderOnly = lazy(() => import("@/layouts/HeaderOnly"));
// export const NoneLayouts = lazy(() => import("@/layouts/NoneLayouts"));
// export const DefaultLayout = lazy(() => import("@/layouts/DefautLayouts"));

// Public Pages
export const Home = lazy(() => import("@/pages/home"));
export const LoginPage = lazy(() => import("@/pages/login/loginPage"));
export const RegisterUser = lazy(() => import('@/pages/register_user/index'));
export const ListPage = lazy(() => import("@/pages/list"));
export const ShowNew = lazy(() => import("@/pages/showNew"));
export const Advertisement = lazy(() => import("@/pages/advertisement/"));
export const RestPassword = lazy(() => import('@/pages/rest/index'));
export const ForgotPassword = lazy(() => import('@/pages/forgot_password/index'));
export const Introduce = lazy(() => import('@/pages/introduce/index'));
export const AdDashboard = lazy(() => import("@/pages/adver_dashboard/index.jsx"));
export const AdRegistrationForm = lazy(() => import("@/pages/formadvertisement/index.jsx"));
export const Category = lazy(() => import("@/pages/danhmuc/index.jsx"));
export const AdminDashboard = lazy(() => import("@/pages/admin/index.jsx"));
export const ConfirmOTP = lazy(() => import("@/pages/otp/index.jsx"));
export const ChiTietQuangCao = lazy(() => import("@/pages/advertismentDetail/index.jsx"));
// Protected Pages
export const TacGiaDashboard = lazy(() => import("@/pages/submitPost"));
export const DangXuLy = lazy(() => import("@/pages/dang_xu_ly"));
export const CensorDashboard = lazy(() => import("@/pages/censor"));
export const UserDashboard = lazy(() => import("@/pages/user"));
export const PaymentPage = lazy(() => import("@/pages/pay/index.jsx"));