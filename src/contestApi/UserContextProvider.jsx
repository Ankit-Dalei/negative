import { createContext, useContext, useState } from "react";

// Create context
export const UserContext = createContext(null);

export const UserContextPro=()=> {return useContext(UserContext)};

// Provider Component
export const UserContextProvider = ({ children }) => {
  const [role, setRole] = useState("guest");
  return (
    <UserContext.Provider value={{role, setRole}}>
      {children}
    </UserContext.Provider>
  );
};
