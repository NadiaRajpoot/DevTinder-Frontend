// src/context/AuthFormContext.js
import { createContext, useState } from "react";

export const AuthFormContext = createContext();

export const AuthFormProvider = ({ children }) => {
  const [isLoginForm, setisLoginForm] = useState(true);

  return (
    <AuthFormContext.Provider value={{ isLoginForm, setisLoginForm }}>
      {children}
    </AuthFormContext.Provider>
  );
};
