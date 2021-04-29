import Head from 'next/head';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React from 'react';
import Sidebar from '../components/Sidebar';
import GlobalStyle from "../styles/global";
import { Provider } from "react-redux";
import initStore from "../redux/createStore";
import withRedux from 'next-redux-wrapper';

function MyApp({ Component, pageProps }) {

    //Example is logged in constant
    const LOGGED_IN = true;

    const store = initStore();

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

                    {/*TODO: Create a proper AuthProvider and AuthContext for using here*/}
                    {LOGGED_IN ? <>
                        <Sidebar/>
                        <div className="main-context">
                            <Component {...pageProps} />
                        </div>
                    </> : <>
                        Got you, you shall not pass ! <i>without login</i>
                    </>}
                    
                </div>
            </Provider>
        </>
    )
}

export default withRedux(initStore)(MyApp);
