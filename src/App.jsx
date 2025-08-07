import React from "react";
import AppRoutes from "./components/routers/Routes";
import './App.css';
import { UserContextPro } from "./contestApi/UserContextProvider";

const App = () => {
  const role = localStorage.getItem('authToken')
  let Users = UserContextPro() 
  if(role){
    Users.setRole('user')
  }
  console.log(Users.role)
  
  return (
      <AppRoutes />
  );
};

export default App;
