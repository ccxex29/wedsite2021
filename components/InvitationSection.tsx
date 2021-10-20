import {Button} from '@mui/material';
import styles from '../styles/InvitationSection.module.sass';
import Link from 'next/link';

const InvitationSection = () => {
    return (
        <div className={styles.invitationWrapper}>
            <h4>Our Online Wedding Ceremony On</h4>
            <h2>
                Friday, 11 November 2021<br/>
                11 PM (GMT+7)
            </h2>
            <div style={{marginTop: '3rem'}}>
                <Link href={'/livestreaming'}>
                    <a>
                    <Button color={'tertiary'} variant={'contained'}>JOIN US</Button>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default InvitationSection;
