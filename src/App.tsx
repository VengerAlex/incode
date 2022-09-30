import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Layout from "./components/Layout";
import Header from "./components/Header";

import {ROUTES} from "./utils";
import {useAppSelector} from "./hooks/useAppSelector";
import ProtectedRoute from "./components/ProtectedRoute";
import {getUserState} from "./redux/reducers/user/userSlice";
import localstorageService from "./services/localstorage/localstorage.service";
import NotFound from "./pages/NotFound";

const App: FC = () => {
    const {user} = useAppSelector(getUserState);
    const isAuth = localstorageService.get("accessToken")

    return (
        <Layout>
            <Header/>
            <Routes>
                <Route path={ROUTES.Home} element={
                    <ProtectedRoute isAllowed={!!isAuth || !!user}>
                        <Home/>
                    </ProtectedRoute>}
                />
                <Route path={ROUTES.Auth} element={<Auth/>}/>
                <Route path={ROUTES.NotFound} element={<NotFound />} />
            </Routes>
        </Layout>
    );
};

export default App;