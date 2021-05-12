import router from "next/router";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { allMenuItems } from "./constants";
import auth from "./core/auth";

const withAuth = (Component) => (props) => {

    const [ok, setOk] = useState(false);

    const loginCheck = () => {

        if (!auth.loggedIn || !auth.user?.roles) {
            router.push("/auth/login");
            return;
        }

        setOk(true);
    };

    useEffect(()=>{
        auth.init();
        loginCheck();
    }, []);

    const LoggedInComp = () => (<>
        <Sidebar />
        <div className="main-context">
            <Component {...props} />
        </div>
    </>);

    const renderComp = () => {
        if(ok){
            return LoggedInComp();
        }
    }

    return (
        <>
            {renderComp()}      
        </>
    );
};

export default withAuth;
