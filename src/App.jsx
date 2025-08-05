import React from "react";
import AppRoutes from "./components/routers/Routes";
import { UserContextProvider } from "./contestApi/UserContextProvider"; // FIXED
import './App.css';

const App = () => {
  return (
    <UserContextProvider>
      <AppRoutes />
    </UserContextProvider>
  );
};

export default App;
