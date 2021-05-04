import Head from "next/head";

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import GlobalStyle from "../styles/global";
import { Provider } from "react-redux";
import store from "../store/store";
import { useRouter } from 'next/router';


function MyApp(props) {
    //Example is logged in constant

    const [loggedIn, setLoggedIn] = useState(false);
    const [init, setInit] = useState(false);

    const router = useRouter();

    useEffect(()=>{
        setLoggedIn(Boolean(localStorage.getItem("access_token")));
        setInit(true);
    }, []);

    const renderPanels = () => {
        if(router.pathname === "/auth/login"){
            if(loggedIn){
                router.push("/");
            }else{
                return <props.Component {...props.pageProps} />
            }
            return;
        }

        if(loggedIn){
            return (<>
                <Sidebar/>
                <div className="main-context">
                    <props.Component {...props.pageProps} />
                </div>
            </>)
        }else{
            router.push("/auth/login");
            return;
        }
    }

    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/images/logos/logo.png"></link>
                <title>Eve Yemek - Admin Panel</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Eve yemek admin panel" />
            </Head>
            <Provider store={store}>
                <div className="app">
                    <GlobalStyle/>

                    {init && renderPanels()}
                    
                </div>
            </Provider>
        </>
    )
}

export default MyApp;
