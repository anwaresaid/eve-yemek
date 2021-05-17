import Head from "next/head";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import GlobalStyle from "../styles/core/global";
import { Provider } from "react-redux";
import store from "../store/store";
import auth from "../helpers/core/auth";
import Error from "next/error";

function MyApp(props) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(false);
    const [authCheckFinish, setAuthCheckFinish] = useState(false);

    useEffect(() => {
        auth.init();
        authCheck();
        setLoggedIn(auth.loggedIn);
    }, []);

    const authCheck = () => {
        if ((!auth.loggedIn || !auth.user?.roles) && window.location.pathname !== "/auth/login") {
            window.location.replace("/auth/login");
            return;
        }

        if(auth.loggedIn && window.location.pathname === "/auth/login"){
            window.location.replace("/");
            return;
        }

        if(!auth.isAllowedRoute(window.location.pathname)){
            setError(true);
        }

        setAuthCheckFinish(true);
    };

    const renderComp = () => {

        if(!authCheckFinish){
            //TODO: Loading comp
            return (()=><>Loading</>)();
        }

        if (error) {
            return <Error statusCode={404}/>;
        }

        if (loggedIn) {
            return (
                <>
                    <Sidebar />
                    <div className="main-context">
                        <props.Component {...props.pageProps} />
                    </div>
                </>
            );
        }

        return <props.Component {...props.pageProps} />;
    };

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/images/logos/logo.png"></link>
                <title>Eve Yemek - Admin Panel</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="initial-scale=1.0, width=device-width"
                />
                <meta name="description" content="Eve yemek admin panel" />
            </Head>
            <Provider store={store}>
                <div className="app">
                    <GlobalStyle />

                    {renderComp()}
                </div>
            </Provider>
        </>
    );
}

export default MyApp;
