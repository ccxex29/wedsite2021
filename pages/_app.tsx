import '../styles/globals.scss';
import 'antd/dist/antd.min.css';
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

Router.events.on('routeChangeStart', () => {
    NProgress.configure({showSpinner: false}).start();
});
Router.events.on('routeChangeComplete', () => {
});
Router.events.on('routeChangeError', () => {
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

            <ThemeProvider theme={BrandMaterialTheme}>
                <Component {...pageProps} />
            </ThemeProvider>

            <BottomFAB />
            <Footer/>
        </div>
    );
}

export default MyApp;
