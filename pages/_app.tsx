import Head from "next/head";
import vars from "../styles/core/variables";

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
import { i18n } from "../language";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import { useRouter } from "next/router";

function MyApp(props) {
    
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState(false);
    const [authCheckFinish, setAuthCheckFinish] = useState(false);
    const [hideBar, setHideBar] = useState(true);
    const router = useRouter();

    useEffect(() => {
        auth.init();
        authCheck();
        setLoggedIn(auth.loggedIn);
        document?.documentElement?.setAttribute("lang", i18n.language);
        document?.documentElement?.setAttribute("dir",i18n.dir());
    }, []);

    const authCheck = () => {
        if (auth.loggedIn && window.location.pathname === "/auth/login") {
            window.location.replace("/");
            return;
        }

        if (window.location.pathname !== "/auth/login") {
            if (!auth.loggedIn || !auth.user?.roles) {
                window.location.replace("/auth/login");
                return;
            }

            //Check is route direcly allowed
            if (!auth.isAllowedRoute(window.location.pathname)) {

                //If not, then check with id, like [/orders/]123456 find inside [*] and check with that
                if (
                    !auth.isAllowedRoute(
                        window.location.pathname.substr(
                            0,
                            window.location.pathname.indexOf("/", 3) // The second "/"
                        )
                    )
                ) {
                    setError(true);
                }
            }
        }

        setAuthCheckFinish(true);
    };

    const renderComp = () => {
        if (!authCheckFinish) {
            //TODO: Loading comp
            return (() => <>Loading</>)();
        }

        if (error) {
            return <Error statusCode={404} />;
        }

        if (loggedIn) {
                return (
                    <>  
                        <Sidebar open={hideBar} setOpen={setHideBar}  />
                        
                            {hideBar?
                            <>
                            <Card className="main-context-card-showBar" style={{display: 'block', height: '100px', maxWidth: (window.innerWidth - vars.sidebar_left_margin)+ 'px'}}>
                                <Button icon="pi pi-bars" className=" p-button-secondary" onClick={()=> {setHideBar(!hideBar)}}/>
                                <Dropdown style={{float: 'right', marginRight: '20px'}} 
                                     id="language"
                                     name="language"
                                     placeholder="Language"
                                     options={[
                                       {value: 'en', label:'English'}, 
                                       {value: 'ar', label:'اَلْعَرَبِيَّةُ'}, 
                                       {value: 'ru', label:'русский'},
                                       {value: 'tr', label:'Türkçe'}
                                     ]}
                                     value={i18n.language}
                                     onChange={(e) => {i18n.changeLanguage(e.value); router.reload();}}
                                ></Dropdown>
                            </Card>
                           
                        <div className="main-context-showBar">
                            <props.Component {...props.pageProps} />
                        </div >
                            </>
                        :
                        <>
                         <Card className="main-context-card-hideBar">
                                <Button icon="pi pi-bars" className=" p-button-secondary" onClick={()=> {setHideBar(!hideBar)}}/>
                            </Card>
                            <div className="main-context-hideBar">
                            <props.Component {...props.pageProps} />
                        </div >
                        </>
        }            
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
                    <GlobalStyle open={hideBar} setOpen={setHideBar}/>

                    {renderComp()}
                </div>
            </Provider>
        </>
    );
}

export default MyApp;
