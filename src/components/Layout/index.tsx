import React from 'react';
import "../../styles/index.scss";
import Header from "../Header";

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="box">
            <div className="layout">
                <div className="container">
                    <Header/>

                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;