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
import { useRouter } from "next/router";
import { allMenuItems } from "../helpers/constants";
import { Column } from "primereact/column";
import withAuth from "../helpers/withAuth";

function MyApp(props) {

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

                    <props.Component {...props.pageProps} />
                </div>
            </Provider>
        </>
    );
}

export default MyApp;
