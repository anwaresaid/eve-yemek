import Head from 'next/head';
import { hotjar } from 'react-hotjar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from '../components/Sidebar';
import GlobalStyle from '../styles/core/global';
import { Provider, useSelector } from 'react-redux';
import store from '../store/store';
import auth from '../helpers/core/auth';
import Error from 'next/error';
import { i18n } from '../language';
import TopBar from '../components/TopBar';
import { useSocket } from '../helpers/socket';
import SoundToast from '../components/soundToast';
import { momentSetLocale } from '../helpers/dateFunctions';

function MyApp(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  const [authCheckFinish, setAuthCheckFinish] = useState(false);
  const [hideBar, setHideBar] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null);

  const toast = useRef(null);

  let socket: any;

  useEffect(() => {
    auth.init();
    authCheck();
    setLoggedIn(auth.loggedIn);
    momentSetLocale();
    document?.documentElement?.setAttribute('lang', i18n.language);
    document?.documentElement?.setAttribute('dir', i18n.dir());
    hotjar.initialize(parseInt(process.env.NEXT_PUBLIC_HOTJAR_TRACKING_ID), 6);
    if (auth.loggedIn && auth.hasRoles('restaurant_owner')) {
      socket = useSocket();
      if (socket) {
        auth?.user?.restaurant_ids?.map((restaurant_id) => {
          socket.on(`order.created.${restaurant_id}`, ({ payload }) => {
            setOrderStatus(true);
            toast.current.show({
              severity: 'success',
              summary: i18n.t('newOrder'),
              detail: i18n.t('newOrderMessage', {
                userName: payload.user.name,
                restaurantName: payload.restaurant.name,
              }),
            });
            setOrderStatus(false);
          });
        });
      }
    }

    setHideBar((localStorage.getItem('sidebar_open') || 'true') === 'true');
  }, []);

  useEffect(() => {
    const storageSideBar = localStorage.getItem('sidebar_open');
    if (storageSideBar) {
      if ((storageSideBar === 'true') !== hideBar) {
        localStorage.setItem('sidebar_open', hideBar.toString());
      }
    } else {
      localStorage.setItem('sidebar_open', hideBar.toString());
    }
  }, [hideBar]);

  const authCheck = () => {
    if (auth.loggedIn && window.location.pathname === '/auth/login') {
      window.location.replace('/');
      return;
    }

    if (
      window.location.pathname !== '/auth/login' &&
      window.location.pathname !== '/auth/forgot_password' &&
      window.location.pathname !== '/auth/reset_password'
    ) {
      if (!auth.loggedIn || !auth.user?.roles) {
        window.location.replace('/auth/login');
        return;
      }

      //Check is route direcly allowed
      if (!auth.isAllowedRoute(window.location.pathname)) {
        //If not, then check with id, like [/orders/]123456 find inside [*] and check with that
        if (
          !auth.isAllowedRoute(
            window.location.pathname.substr(
              0,
              window.location.pathname.indexOf('/', 3) // The second "/"
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
      return <Error id='errorStatusCode' statusCode={404} />;
    }

    if (loggedIn) {
      return (
        <>
          <Sidebar open={hideBar} setOpen={setHideBar} />
          <TopBar hideBar={hideBar} setHideBar={setHideBar} />

          <div className={'main-context' + (hideBar ? '-showBar' : '-hideBar')}>
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
        <link
          id='logoLink'
          rel='shortcut icon'
          href='/images/logos/logo.png'
        ></link>
        <title id='adminPanelTitle'>Eve Yemek - Admin Panel</title>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta
          id='adminPanelDescription'
          name='description'
          content='Eve yemek admin panel'
        />
      </Head>
      <Provider store={store}>
        <div id='appDiv' className='app'>
          <GlobalStyle id='globalStyle' open={hideBar} setOpen={setHideBar} />
          {renderComp()}
          <SoundToast toastRef={toast} orderStatus={orderStatus} />
        </div>
      </Provider>
    </>
  );
}

export default MyApp;
