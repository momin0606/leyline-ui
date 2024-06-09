import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "src/Context/auth";

const ProtectedRoute: React.FC = () => {
  const { auth, loading } = useContext(AuthContext);
  if (loading) {
    return <p>...loading</p>;
  }

  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
