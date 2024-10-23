import HeaderOnly from "@/layouts/HeaderOnly";
import Advertisement from "@/pages/advertisement/";
import ModeratorDashboard from "@/pages/censor";
import EditorDashboard from "@/pages/editor_dashboard";
import ForgotPassword from '@/pages/forgot_password/index';
import Home from "@/pages/home";
import Introduce from '@/pages/introduce/index';
import ListPage from "@/pages/list";
import LoginPage from "@/pages/login/loginPage";
import Pay from '@/pages/pay';
import RegisterUser from '@/pages/register_user/index';
import RestPassword from '@/pages/rest/index';
import ShowNew from "@/pages/showNew";
import SignAdvertising from "@/pages/sign_advertising";
import TacGiaDashboard from "@/pages/submitPost";
import UserDashboard from "@/pages/user";


// Public Route
const publicRoutes = [
    {path: "/" , component: Home},
    {path: "/home" , component: Home},
    {path: "/home/login", component: LoginPage, layout: HeaderOnly},
    {path: "/home/register_user", component:RegisterUser, layout: HeaderOnly},
    {path: "/home/:magazineSlug", component: ListPage},
    {path: "/home/:magazineSlug/:articleSlug", component: ShowNew},
    {path: "/home/advertisement", component: Advertisement},
    {path: "/home/pay", component: Pay},
    {path: "/home/sign_advertising", component: SignAdvertising},
    {path: "/home/profile_user", component: UserDashboard, layout: HeaderOnly},
    {path: "/home/resetPassword", component: RestPassword, layout: HeaderOnly},
    {path: "/home/forgot_password", component:ForgotPassword, layout: HeaderOnly},
    {path: "/home/introduce", component:Introduce},
    {path: "/home/editor_dashboard", component:EditorDashboard, layout: HeaderOnly},
    {path: "/home/censor_dashboard", component:ModeratorDashboard, layout: HeaderOnly},


];

// Routes được bảo vệ (cần xác thực)
const privateRoutes = [
    { 
        path: "/home", 
        component: Home,
        roles: ['ADMIN', 'KHACHHANG'] 
    },
    { 
        path: "/home/TacGiaDashboard", 
        component: TacGiaDashboard, 
        layout: HeaderOnly,
        roles: ['ADMIN', 'AUTHOR']
    },
    { 
        path: "/home/list", 
        component: ListPage,
        roles: ['admin', 'user']
    },
    { 
        path: "/home/pay", 
        component: Advertisement,
        roles: ['admin']  // Chỉ admin mới truy cập được
    }
   
];

export { privateRoutes, publicRoutes };

