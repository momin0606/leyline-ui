import React, { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  auth: any;
  setAuth: (value: any) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  auth: undefined,
  setAuth: (value: any) => {},
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      if ((decodedToken as any).exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
      } else {
        setAuth(decodedToken);
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
