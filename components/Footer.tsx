import styles from '../styles/Home.module.sass';
import {HeartFilled} from '@ant-design/icons';

const Footer = (): JSX.Element => {
    return (
        <footer className={styles.footer}>
            <p>
                Created with&nbsp;
                <HeartFilled style={{color: 'red'}} />
                &nbsp;by Louis Raymond
            </p>
            <p>
                Powered by Next.js, Cloudflare, Backblaze, Imgix and Netlify
            </p>
        </footer>
    );
};

export default Footer;
