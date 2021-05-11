import router from "next/router";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const withAuth = (Component) => (props) => {

    const [ok, setOk] = useState(false);

    const loginCheck = () => {
        const loggedIn = Boolean(localStorage.getItem("access_token"));
        const user = JSON.parse(localStorage.getItem("user"));

        if (router.pathname === "/auth/login") {
            if (loggedIn) {
                router.push("/");
            }
        }

        if (!loggedIn || !user?.roles) {
            router.push("/auth/login");
            return;
        }

        setOk(true);
    };

    useEffect(()=>{
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
