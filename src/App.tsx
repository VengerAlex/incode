import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";

import { ROUTES } from "./utils";
import { useAppSelector } from "./hooks/useAppSelector";
import ProtectedRoute from "./components/ProtectedRoute";
import { getUserState } from "./redux/reducers/user/userSlice";
import localstorageService from "./services/localstorage/localstorage.service";
import NotFound from "./pages/NotFound";
import PermissionDenied from "./pages/PermissionDenied";

const App: FC = () => {
  const { user } = useAppSelector(getUserState);
  const isAuth = localstorageService.get("accessToken");

  return (
    <Routes>
      <Route element={(
        <ProtectedRoute
          isAllowed={!!isAuth || !!user}
        />
)}
      >
        <Route path={ROUTES.Home} element={<Home />} />
      </Route>

      <Route path={ROUTES.Auth} element={<Auth />} />
      <Route path={ROUTES.Denied} element={<PermissionDenied />} />
      <Route path={ROUTES.NotFound} element={<NotFound />} />
    </Routes>
  );
};

export default App;
