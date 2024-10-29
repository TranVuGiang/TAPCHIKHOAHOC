import HeaderOnly from "@/layouts/HeaderOnly";
import Advertisement from "@/pages/advertisement/";
import ModeratorDashboard from "@/pages/censor";
import EditorDashboard from "@/pages/editor_dashboard";
import ForgotPassword from '@/pages/forgot_password/index';
import Home from "@/pages/home";
import Introduce from '@/pages/introduce/index';
import ListPage from "@/pages/list";
import LoginPage from "@/pages/login/loginPage";
import RegisterUser from '@/pages/register_user/index';
import RestPassword from '@/pages/rest/index';
import ShowNew from "@/pages/showNew";
import TacGiaDashboard from "@/pages/submitPost";
import UserDashboard from "@/pages/user";
import AdDashboard from "@/pages/adver_dashboard/index.jsx";
import AdRegistrationForm from "@/pages/formadvertisement/index.jsx";
import PaymentPage from "@/pages/pay/index.jsx";


// Public Route
const publicRoutes = [
    {path: "/" , component: Home},
    {path: "/home" , component: Home},
    {path: "/home/login", component: LoginPage, layout: HeaderOnly},
    {path: "/home/register_user", component:RegisterUser, layout: HeaderOnly},
    {path: "/home/:magazineSlug", component: ListPage},
    {path: "/home/:magazineSlug/:articleSlug", component: ShowNew},
    {path: "/home/advertisement", component: Advertisement},
    {path: "/home/resetPassword", component: RestPassword, layout: HeaderOnly},
    {path: "/home/forgot_password", component:ForgotPassword, layout: HeaderOnly},
    {path: "/home/introduce", component:Introduce},
    {path: "/home/danhmuc"},
    {path: "/home/adver_dashboard", component: AdDashboard, layout: HeaderOnly},
    {path: "/home/dang-ky-quang-cao", component: AdRegistrationForm, layout: HeaderOnly},

];

// Routes được bảo vệ (cần xác thực)
const privateRoutes = [
    { 
        path: "", 
        component: TacGiaDashboard, 
        layout: HeaderOnly,
        roles: [0] //Quản trị viên
    },
    { 
        path: "/home/editor_dashboard", 
        component: EditorDashboard, 
        layout: HeaderOnly,
        roles: [1] //Biên tập viên
    },
    { 
        path: "/home/censor_dashboard", 
        component: ModeratorDashboard, 
        layout: HeaderOnly,
        roles:[2]  //Kiểm duyệt
    },
    { 
        path: "/home/option_advertisement",
        component: Advertisement,
        roles: [4]  // Chỉ admin và đối tác quảng cáo mới truy cập được
    },
    { 
        path: "/home/profile_user", 
        component: UserDashboard, 
        layout: HeaderOnly,
        roles: [0,1,2,3,4,5] //Khách hàng
    },
    { 
        path: "/home/payment",
        component: PaymentPage,
        roles: [4]  // Chỉ admin và đối tác quảng cáo mới truy cập được
    },
    { 
        path: "/home/TacGiaDashboard/*", 
        component: TacGiaDashboard, 
        layout: HeaderOnly,
        roles: [5]
    },

   
];

export { privateRoutes, publicRoutes };

