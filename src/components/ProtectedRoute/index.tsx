import React, {FC, useEffect} from 'react';
import {ROUTES} from "../../utils";
import {Navigate, useNavigate} from "react-router-dom";

interface IProtectedRoute {
    children: React.ReactNode,
    isAllowed: boolean,
    redirectPath?: string
}

const ProtectedRoute: FC<IProtectedRoute> = (
    {children, isAllowed, redirectPath= ROUTES.Auth}
) => {
    if (!isAllowed) return <Navigate to={redirectPath} replace />

    return <>{children}</>
};

export default ProtectedRoute;