import LoginPage from "@/pages/login/loginPage";
import RegistrationForm from "@/pages/register/index";

// Public Route
const publicRoutes = [
    {path: "/login", component: LoginPage},
    {path: "/register", component: RegistrationForm}
];

const privateRoutes = []
export { privateRoutes, publicRoutes };
