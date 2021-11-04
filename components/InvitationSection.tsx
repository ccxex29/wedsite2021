import {Button} from '@mui/material';
import styles from '../styles/InvitationSection.module.sass';
import Link from 'next/link';

const InvitationSection = () => {
    return (
        <div className={styles.invitationWrapper} aria-label={'Schedule Invitation'}>
            <h2 style={{fontSize: '1em'}}>Our Online Wedding Ceremony On</h2>
            <p style={{fontSize: '1.5em'}}>
                Friday, 12 November 2021<br/>
                10 AM (GMT+7)
            </p>
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
