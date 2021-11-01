import styles from '../styles/Home.module.sass';
import {HeartFilled} from '@ant-design/icons';

const Footer = (): JSX.Element => {
    return (
        <footer className={styles.footer}>
            <p>
                Made with&nbsp;
                <HeartFilled style={{color: 'red'}} />
                &nbsp;by the joint effort of the celebrants
            </p>
            <p>
                Powered by various techs including Next.js, Cloudflare, Backblaze, Imgix and Netlify
            </p>
        </footer>
    );
};

export default Footer;
