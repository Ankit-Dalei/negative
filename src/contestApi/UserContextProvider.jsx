import React, { createContext, useContext, useState } from "react";

// Create context
export const userContext = createContext({
  role: 'guest',
  setRole: () => {}
});

// Hook for usage
export const useRole = () => useContext(userContext);

// Provider Component
export const UserContextProvider = ({ children }) => {
  const [role, setRole] = useState("guest");

  return (
    <userContext.Provider value={{ role, setRole }}>
      {children}
    </userContext.Provider>
  );
};
