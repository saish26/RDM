import React from "react";

const Layout: React.FC<any> = ({ children }) => {
    return (
        <main>
            <section>{children}</section>
        </main>
    );
};

export default Layout;
