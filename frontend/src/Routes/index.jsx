import HeaderOnly from "@/layouts/HeaderOnly";
import Home from "@/pages/home";
import ListPage from "@/pages/list";
import LoginPage from "@/pages/login/loginPage";
import RegistrationForm from "@/pages/register/index";
import SubmissionForm from "@/pages/submitPost";
import PackageQC from "@/pages/package/QC";
import Pay from "@/pages/pay/index";
import SignAdvertising from "@/pages/sign_advertising/index";


// Public Route
const publicRoutes = [
    {path: "/" , component: Home},
    {path: "/login", component: LoginPage, layout: HeaderOnly},
    {path: "/register", component: RegistrationForm, layout: HeaderOnly},
    {path: "/submitForm", component: SubmissionForm, layout: HeaderOnly},
    {path: "/list", component: ListPage},
    {path: "/package", component: PackageQC},
    {path: "/pay", component: Pay},
    {path: "/sign_advertising", component: SignAdvertising},
];

const privateRoutes = []
export { privateRoutes, publicRoutes };

