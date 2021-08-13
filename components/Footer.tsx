import styles from '../styles/Home.module.css';
import {HeartFilled} from '@ant-design/icons';

const Footer = props => {
    return (
        <footer className={styles.footer}>
            <a
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    color: 'unset'
                }}
            >
                Created with&nbsp;
                <HeartFilled style={{color: 'red'}} />
                &nbsp;by Louis Raymond
            </a>
        </footer>
    );
};

export default Footer;