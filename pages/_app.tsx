import '../styles/globals.scss';
import 'antd/dist/antd.css';
import Head from 'next/head';
import HeaderNavigator from '../components/HeaderNavigator';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.sass';
import BottomFAB from '../components/BottomFAB';
import {AppProps} from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';
import BrandMaterialTheme from '../components/BrandMaterialTheme';
import {ThemeProvider} from '@mui/material/styles';
import {useEffect, useState} from 'react';
import {height} from '@mui/system';

Router.events.on('routeChangeStart', url => {
    NProgress.configure({showSpinner: false}).start();
});
Router.events.on('routeChangeComplete', url => {
    NProgress.done();
});
Router.events.on('routeChangeError', url => {
    NProgress.done();
});

function MyApp({Component, pageProps}: AppProps) {
    // const [dimensions, setDimensions] = useState({
    //     width: 0,
    //     height: 0,
    // });
    // useEffect(() => {
    //     trackDimensions();
    //     window.addEventListener('resize', trackDimensions);
    //     return () => {
    //         window.removeEventListener('resize', trackDimensions);
    //     }
    // }, [])
    // const trackDimensions = () => {
    //     setDimensions({
    //         width: window.innerWidth,
    //         height: window.innerHeight,
    //     });
    //     console.log(dimensions, window.innerWidth, window.innerHeight);
    // };

    return (
        <div className={styles.container}>
            <Head>
                <title>FecUndGrace</title>
                <meta name="description" content="Fecund and Grace Wedding Website"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel={'stylesheet'} href={'https://unpkg.com/nprogress@0.2.0/nprogress.css'}/>
            </Head>
            <HeaderNavigator/>

            <ThemeProvider theme={BrandMaterialTheme}>
                <Component {...pageProps} />
            </ThemeProvider>

            <BottomFAB />
            <Footer/>
        </div>
    );
};

export default MyApp;
