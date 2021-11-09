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
import colours from '../constants/colours';

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
                <title>Fecund&Grace</title>
                <meta name="description" content="Fecund and Grace's Wedding Website"/>
                <meta name={'keywords'} content={'lie fecund maria stephanie grace wedding ceremony live livestreaming livestream streaming stream gallery video slideshow'} />
                <meta name={'theme-color'} content={colours.tertiary} />
                <link rel={'canonical'} href={'https://www.fecundgrace.com'} />
                <link rel="icon" href="/favicon.ico"/>
                <link rel={'stylesheet'} href={'https://unpkg.com/nprogress@0.2.0/nprogress.css'}/>
                <link rel={'stylesheet'} href={'https://cdn.plyr.io/3.6.9/plyr.css'} />
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
