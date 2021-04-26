import Head from 'next/head';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/styles.css'

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="shortcut icon" href="/logo.png"></link>
                <title>Eve Yemek - Admin Panel</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Eve yemek admin panel" />
                <meta name="theme-color" content="#000000" />
            </Head>

            <Component {...pageProps} />
        </>
    )
}

export default MyApp;
