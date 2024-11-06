import HeaderOnly from "@/layouts/HeaderOnly";
import NoneLayouts from "@/layouts/NoneLayouts";
import * as Components from "@/Routes/lazyComponents";


// Public Route
const publicRoutes = [
    {path: "/" , component: Components.Home},
    {path: "/home" , component: Components.Home},
    {path: "/home/login", component: Components.LoginPage, layout: NoneLayouts},
    {path: "/home/register_user", component: Components.RegisterUser, layout: NoneLayouts},
    {path: "/home/:magazineSlug", component: Components.ListPage},
    {path: "/home/:magazineSlug/:articleSlug", component: Components.ShowNew},
    {path: "/home/advertisement", component: Components.Advertisement},
    {path: "/reset-password", component: Components.RestPassword, layout: NoneLayouts},
    {path: "/home/forgot_password", component: Components.ForgotPassword, layout: NoneLayouts},
    {path: "/home/introduce", component: Components.Introduce},
    {path: "/home/danhmuc", component: Components.Category},
    {path: "/home/adver_dashboard", component: Components.AdDashboard, layout: HeaderOnly},
    {path: "/home/dang-ky-quang-cao", component: Components.AdRegistrationForm, layout: HeaderOnly},
];

// Routes được bảo vệ (cần xác thực)
const privateRoutes = [
    { 
        path: "", 
        component: Components.TacGiaDashboard, 
        layout: HeaderOnly,
        roles: [0] //Quản trị viên
    },
    { 
        path: "/home/editor_dashboard", 
        component: Components.EditorDashboard, 
        layout: HeaderOnly,
        roles: [1] //Biên tập viên
    },
    { 
        path: "/home/censor_dashboard", 
        component: Components.CensorDashboard, 
        layout: HeaderOnly,
        roles:[2]  //Kiểm duyệt
    },
    { 
        path: "/home/option_advertisement",
        component: Components.Advertisement,
        roles: [4]  // Chỉ admin và đối tác quảng cáo mới truy cập được
    },
    { 
        path: "/home/profile_user", 
        component: Components.UserDashboard, 
        layout: NoneLayouts,
        roles: [0,1,2,3,4,5] //Khách hàng
    },
    { 
        path: "/home/payment",
        component: Components.PaymentPage,
        roles: [4]  // Chỉ admin và đối tác quảng cáo mới truy cập được
    },
    { 
        path: "/home/TacGiaDashboard/*", 
        component: Components.TacGiaDashboard, 
        layout: HeaderOnly,
        roles: [5]
    },

   
];

export { privateRoutes, publicRoutes };

