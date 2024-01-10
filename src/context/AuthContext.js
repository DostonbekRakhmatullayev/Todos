import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const Local = window.localStorage.getItem("watch_login_token") || false;
  const [token, setToken] = useState(Local);

  useEffect(() => {
    window.localStorage.setItem("watch_login_token", token);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
