import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "src/Context/auth";

const AuthRoute: React.FC = () => {
  const { auth } = useContext(AuthContext);

  return !auth ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AuthRoute;
