import styles from '../styles/Livestreaming.module.sass';
import {Alert, Snackbar} from '@mui/material';
import NProgress from 'nprogress';

const livestreaming = (): JSX.Element => {
    NProgress.done();
    const contentId = '-kW3UKhVaWE';
    return (
        <main className={styles.cover}>
            <iframe
                className={styles.embed}
                src={`https://www.youtube-nocookie.com/embed/${contentId}?&showsearch=0&rel=0&color=white&modestbranding=1`}
                title="Watch Our Wedding Ceremony via Youtube"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
            {/*<Snackbar open={true} sx={{width: '100%'}} >*/}
            {/*    <Alert severity={'info'}>*/}
            {/*        To do: make embed always loaded in the background like youtube*/}
            {/*    </Alert>*/}
            {/*</Snackbar>*/}
        </main>
    )
}

export default livestreaming;
