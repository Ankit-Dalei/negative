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
import UserPanel from "../../afterAuth/UserPanal";
import Dashboard from "../../afterAuth/Dashboard";
import Analytics from "../../afterAuth/Analytics";
import Database from "../../afterAuth/Database";
import ApiManager from "../../afterAuth/ApiManager";
import CloudStorage from "../../afterAuth/CloudStorage";
import Security from "../../afterAuth/Security";

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
  },{
    path: "home",
    element: <UserPanel/>, 
    children:[
      { index: true, Component: Dashboard },
      { path: "analytics", Component: Analytics },
      { path: "database", Component: Database },
      { path: "api", Component: ApiManager },
      { path: "storage", Component: CloudStorage },
      { path: "security", Component: Security },
    ]
  }
]);
export default router