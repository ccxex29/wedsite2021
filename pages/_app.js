import '../styles/globals.css';
import 'antd/dist/antd.css';
import Head from 'next/head';
import HeaderNavigator from '../components/HeaderNavigator';
import Footer from '../components/Footer';
import styles from '../styles/Home.module.css';

function MyApp({ Component, pageProps }) {
  return (
      <div className={styles.container}>
        <Head>
          <title>FecUndGrace</title>
          <meta name="description" content="Fecund and Grace Wedding Website"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>
        <HeaderNavigator />
        
        <Component {...pageProps} />
        
        <Footer />
      </div>
  );
};

export default MyApp;
