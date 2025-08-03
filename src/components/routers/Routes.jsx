import {
  createBrowserRouter
} from "react-router";
import NavCombo from '../reUseComponents/NavCombo'
import Home from '../Home'
import About from '../About'
import Service from '../Service'
import Contact from '../Contact'
import Login from "../authSystem/Login";
import Signup from "../authSystem/Signup";
import ForgotPasswordPage from "../authSystem/ForgetPass";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavCombo/>,
    children:[
        { index: true, Component: Home },
        { path: "about", Component: About },
        { path: "services", Component: Service },
        { path: "contact", Component: Contact },
        { path: "login", Component: Login },
        { path: "signup", Component: Signup },
        { path: "forgot-password", Component: ForgotPasswordPage },
    ]
  },
]);
export default router