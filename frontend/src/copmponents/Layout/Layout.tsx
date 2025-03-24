import AppToolbar from "../AppToolbar/AppToolbar.tsx";
import {PropsWithChildren} from "react";
import * as React from "react";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
    return (
        <>
            <AppToolbar/>
            {children}
        </>
    );
};

export default Layout;