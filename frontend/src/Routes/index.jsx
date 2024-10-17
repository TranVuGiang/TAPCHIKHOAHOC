import HeaderOnly from "@/layouts/HeaderOnly";
import Advertisement from "@/pages/advertisement/";
import Home from "@/pages/home";
import ListPage from "@/pages/list";
import LoginPage from "@/pages/login/loginPage";
import RegistrationForm from "@/pages/register/index";
import SubmissionForm from "@/pages/submitPost";


// Public Route
const publicRoutes = [
    {path: "/" , component: Home},
    {path: "/home" , component: Home},
    {path: "/login", component: LoginPage, layout: HeaderOnly},
    {path: "/register", component: RegistrationForm, layout: HeaderOnly},
    {path: "/submitForm", component: SubmissionForm, layout: HeaderOnly},
    {path: "/list", component: ListPage},
    {path: "/advertisement", component: Advertisement},

];

// Routes được bảo vệ (cần xác thực)
const privateRoutes = [
    { 
        path: "/home", 
        component: Home,
        roles: ['admin', 'user'] 
    },
    { 
        path: "/submitForm", 
        component: SubmissionForm, 
        layout: HeaderOnly,
        roles: ['admin', 'user']
    },
    { 
        path: "/list", 
        component: ListPage,
        roles: ['admin', 'user']
    },
    { 
        path: "/advertisement", 
        component: Advertisement,
        roles: ['admin']  // Chỉ admin mới truy cập được
    }
];

export { privateRoutes, publicRoutes };

