import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

interface WithAuthenticationProps {
  children: React.ReactNode;
}

const WithAuthentication: React.FC<WithAuthenticationProps> = ({
  children,
}) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (auth.accessToken) {
    console.log('duhh')
    return <>{children}</>;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default WithAuthentication;
