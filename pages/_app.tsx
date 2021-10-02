import '../styles/globals.css';
import 'antd/dist/antd.css';
import Head from 'next/head';
import HeaderNavigator from '../components/HeaderNavigator';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.sass';
import BottomFAB from '../components/BottomFAB';
import {AppProps} from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import {router} from 'next/client';

router.events.on('routeChangeStart', url => {
    NProgress.configure({showSpinner: false}).start();
});
router.events.on('routeChangeComplete', url => {
    NProgress.done();
});
router.events.on('routeChangeError', url => {
    NProgress.done();
});

function MyApp({Component, pageProps}: AppProps) {
    return (
        <div className={styles.container}>
            <Head>
                <title>FecUndGrace</title>
                <meta name="description" content="Fecund and Grace Wedding Website"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel={'stylesheet'} href={'https://unpkg.com/nprogress@0.2.0/nprogress.css'}/>
            </Head>
            <HeaderNavigator/>

            <Component {...pageProps} />

            <BottomFAB />
            <Footer/>
        </div>
    );
};

export default MyApp;
