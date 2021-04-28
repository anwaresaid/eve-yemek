import Head from 'next/head';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React from 'react';
import Sidebar from '../components/Sidebar';
import GlobalStyle from "../styles/global";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/logo.png"></link>
                <title>Eve Yemek - Admin Panel</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Eve yemek admin panel" />
            </Head>

            <GlobalStyle/>

            {
                //TODO: Add condition here to redirect login page if not logged in
            }
            <div className="app">
                <Sidebar/>
                <div className="main-context">
                    <Component {...pageProps} />
                </div>
            </div>
        </>
    )
}

export default MyApp;
