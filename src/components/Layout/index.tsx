import React from 'react';
import "../../styles/index.scss";

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="box">
            <div className="layout">
                <div className="container">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;