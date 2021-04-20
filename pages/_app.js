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
                <link rel="icon" href="/favicon.ico" />
                <title>React App</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Web site created using create-next-app" />
                <meta name="theme-color" content="#000000" />
            </Head>

            <Component {...pageProps} />
        </>
    )
}

export default MyApp;
