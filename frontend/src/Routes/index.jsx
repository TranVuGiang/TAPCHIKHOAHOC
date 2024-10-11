import HeaderOnly from "@/layouts/HeaderOnly";
import Home from "@/pages/home";
import LoginPage from "@/pages/login/loginPage";
import RegistrationForm from "@/pages/register/index";

// Public Route
const publicRoutes = [
    {path: "/" , component: Home},
    {path: "/login", component: LoginPage, layout: HeaderOnly},
    {path: "/register", component: RegistrationForm, layout: HeaderOnly}
];

const privateRoutes = []
export { privateRoutes, publicRoutes };
