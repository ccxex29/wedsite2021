import {Button} from '@mui/material';
import styles from '../styles/InvitationSection.module.sass';
import Link from 'next/link';
import colours from '../constants/colours';

import NameSignature from '../public/name.svg';

const InvitationSection = () => {
    return (
        <div className={styles.invitationWrapper} aria-label={'Schedule Invitation'}>
            <div className={styles.invitationSignature}>
                <NameSignature width={'70%'} />
            </div>
            <div className={styles.invitationInteractable}>
                <h2 className={styles.invitationHeader}>Our Wedding Ceremony</h2>
                <p className={styles.invitationSchedule}>
                    Friday, 12<sup>th</sup> November 2021<br/>
                    at 10 a.m. (GMT+7)
                </p>
                <div>
                    <Link href={'/livestreaming'}>
                        <a>
                            <button className={styles.joinButton}>JOIN US</button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default InvitationSection;
