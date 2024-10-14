import HeaderOnly from "@/layouts/HeaderOnly";
import Home from "@/pages/home";
import ListPage from "@/pages/list";
import LoginPage from "@/pages/login/loginPage";
import RegistrationForm from "@/pages/register/index";
import SubmissionForm from "@/pages/submitPost";
import PackageQC from "@/pages/package/QC";


// Public Route
const publicRoutes = [
    {path: "/" , component: Home},
    {path: "/login", component: LoginPage, layout: HeaderOnly},
    {path: "/register", component: RegistrationForm, layout: HeaderOnly},
    {path: "/submitForm", component: SubmissionForm, layout: HeaderOnly},
    {path: "/list", component: ListPage},
    {path: "/package", component: PackageQC}
];

const privateRoutes = []
export { privateRoutes, publicRoutes };

