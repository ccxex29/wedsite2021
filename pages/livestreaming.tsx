import styles from '../styles/Livestreaming.module.sass';
import {Alert, Snackbar} from '@mui/material';

const livestreaming = (): JSX.Element => {
    const contentId = 'dQw4w9WgXcQ';
    return (
        <main className={styles.cover}>
            <iframe
                className={styles.embed}
                src={`https://www.youtube-nocookie.com/embed/${contentId}?&showsearch=0&rel=0&color=white`}
                title="Watch via Youtube"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
            <Snackbar open={true} sx={{width: '100%'}} >
                <Alert severity={'info'}>
                    To do: make embed always loaded in the background like youtube
                </Alert>
            </Snackbar>
        </main>
    )
}

export default livestreaming;
