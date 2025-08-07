import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { UserContextPro } from "../../contestApi/UserContextProvider";

// Common pages
import NavCombo from '../reUseComponents/NavCombo'
import Home from '../Home'
import About from '../About'
import Service from '../Service'
import Contact from '../Contact'
import Login from "../authSystem/Login";
import Signup from "../authSystem/Signup";
import ForgotPasswordPage from "../authSystem/ForgetPass";

// Protected user pages
import UserPanel from "../../afterAuth/UserPanal";
import Dashboard from "../../afterAuth/Dashboard";
import Analytics from "../../afterAuth/Analytics";
import Database from "../../afterAuth/Database";
import ApiManager from "../../afterAuth/ApiManager";
import CloudStorage from "../../afterAuth/CloudStorage";
import Security from "../../afterAuth/Security";

// // Admin pages (Example)
// import AdminPanel from "../../afterAuth/admin/AdminPanel";
// import AdminUsers from "../../afterAuth/admin/AdminUsers";

// Protected route handler
const ProtectedRoute = ({ allowedRoles, children }) => {
  const auth = localStorage.getItem('authToken')
  const role = localStorage.getItem('role')
  let Users = UserContextPro() 
  let user=Users.role
  if(role && auth){
    user='user'
  }

  if (!allowedRoles.includes(user)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Guest Routes
const guestRoutes = {
  path: "/",
  element: <NavCombo />,
  children: [
    { index: true, Component: Home },
    { path: "about", Component: About },
    { path: "services", Component: Service },
    { path: "contact", Component: Contact },
    { path: "login", Component: Login },
    { path: "signup", Component: Signup },
    { path: "forgot-password", Component: ForgotPasswordPage },
  ]
};

// User Routes
const userRoutes = {
  path: "home",
  element: (
    <ProtectedRoute allowedRoles={["user"]}>
      <UserPanel />
    </ProtectedRoute>
  ),
  children: [
    { index: true, Component: Dashboard },
    { path: "analytics", Component: Analytics },
    { path: "database", Component: Database },
    { path: "api", Component: ApiManager },
    { path: "storage", Component: CloudStorage },
    { path: "security", Component: Security },
  ]
};

// // Admin Routes
// const adminRoutes = {
//   path: "admin",
//   element: (
//     <ProtectedRoute allowedRoles={["admin"]}>
//       <AdminPanel />
//     </ProtectedRoute>
//   ),
//   children: [
//     { index: true, Component: Dashboard }, // Admin dashboard
//     { path: "users", Component: AdminUsers },
//     // Add more admin-only routes here
//   ]
// };

const AppRoutes = createBrowserRouter([
  guestRoutes,
  userRoutes
]);

export default AppRoutes;
