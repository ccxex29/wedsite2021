import styles from '../styles/Home.module.sass';
import {HeartFilled} from '@ant-design/icons';

const Footer = (): JSX.Element => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerTextLine}>
                <span>
                Fecund & Grace
                </span>
                <span className={styles.bar} style={{margin: '0 8px'}}/>
                <span>
                    Est. 12.11.2021
                </span>
            </div>
            {/*<p style={{textAlign: 'center'}}>*/}
            {/*    Made with&nbsp;*/}
            {/*    <HeartFilled style={{color: 'red'}} />*/}
            {/*    &nbsp;by the joint effort of the celebrants*/}
            {/*</p>*/}
            {/*<p>*/}
            {/*    Powered by various techs including Next.js, Cloudflare, Backblaze, Imgix and Netlify*/}
            {/*</p>*/}
        </footer>
    );
};

export default Footer;
