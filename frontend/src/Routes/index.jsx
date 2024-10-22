import HeaderOnly from "@/layouts/HeaderOnly";
import Advertisement from "@/pages/advertisement/";
import Home from "@/pages/home";
import ListPage from "@/pages/list";
import LoginPage from "@/pages/login/loginPage";
import RegistrationForm from "@/pages/register/index";
import ShowNew from "@/pages/showNew";
import SignAdvertising from "@/pages/sign_advertising";
import SubmissionForm from "@/pages/submitPost";
import UserDashboard from "@/pages/user";
import Pay from '../pages/pay/index';
import RestPassword from '@/pages/rest/index';
import ForgotPassword from '@/pages/forgot_password/index';
import Introduce from '@/pages/introduce/index';
import RegisterUser from '@/pages/register_user/index';


// Public Route
const publicRoutes = [
    {path: "/" , component: Home},
    {path: "/home" , component: Home},
    {path: "/login", component: LoginPage, layout: HeaderOnly},
    {path: "/register", component: RegistrationForm, layout: HeaderOnly},
    {path: "/list", component: ListPage},
    {path: "/advertisement", component: Advertisement},
    {path: "/pay", component: Pay},
    {path: "/sign_advertising", component: SignAdvertising},
    {path: "/showNew", component: ShowNew},
    {path: "/user/dashboard", component: UserDashboard, layout: HeaderOnly},
    {path: "/rest", component: RestPassword},
    {path: "/forgot_password", component:ForgotPassword},
    {path: "/introduce", component:Introduce},
    {path: "/register_user", component:RegisterUser}

];

// Routes được bảo vệ (cần xác thực)
const privateRoutes = [
    { 
        path: "/home", 
        component: Home,
        roles: ['ADMIN', 'KHACHHANG'] 
    },
    { 
        path: "/submitForm", 
        component: SubmissionForm, 
        layout: HeaderOnly,
        roles: ['ADMIN', 'AUTHOR']
    },
    { 
        path: "/list", 
        component: ListPage,
        roles: ['admin', 'user']
    },
    { 
        path: "/pay", 
        component: Advertisement,
        roles: ['admin']  // Chỉ admin mới truy cập được
    }
   
];

export { privateRoutes, publicRoutes };

