import React, { FC } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { ROUTES } from "../../utils";

interface IProtectedRoute {
  isAllowed?: boolean,
  redirectPath?: string
}

const ProtectedRoute: FC<IProtectedRoute> = (
  { isAllowed, redirectPath = ROUTES.Auth },
) => {
  const location = useLocation();

  if (!isAllowed) return <Navigate to={redirectPath} state={{ from: location }} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
