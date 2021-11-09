import styles from '../styles/Livestreaming.module.sass';
import NProgress from 'nprogress';
import bird from '../public/images/wedding_day.svg';
import {useEffect} from 'react';
import Plyr from 'plyr';

const message = "As much as we would like to celebrate with you, we apologise that we cannot be together during this time. It would be a pleasure to have your presence in our holy matrimony virtually. If you have any inquiries about the event, do not hesitate to drop us a message."
const contentId = '-kW3UKhVaWE';
const Livestreaming = (): JSX.Element => {
    useEffect(() => {
        const player = new Plyr('#player', {
            volume: 0.5,
        });
        NProgress.done();
    }, []);
    return (
        <main className={styles.cover}>
            <div className={styles.embedWrapper}>
                <div className={styles.embed}>
                    <div style={{width: '100%', height: '100%'}} className={`plyr__video-embed`} id={'player'}>
                        <iframe
                            className={styles.embed}
                            src={`https://www.youtube-nocookie.com/embed/${contentId}?&showsearch=0&rel=0&color=white&modestbranding=1`}
                            title="Watch Our Wedding Ceremony via Youtube"
                            frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </div>
            <div className={styles.textSection}>
                <p style={{
                    textAlign: 'justify',
                    textAlignLast: 'center',
                }}>
                    {message}
                </p>
                <div className={styles.contactWrapper}>
                    <p>
                        Fecund
                    </p>
                    <p>
                        085777767250
                    </p>
                    <p>
                        Grace
                    </p>
                    <p>
                        081280600825
                    </p>
                </div>
                <div className={styles.quoteWrapper}>
                    {bird({
                        style: {
                            width: 128,
                            height: 128,
                        }
                    })}
                    <div className={styles.verseContent}>
                        <p>If either of them falls down,</p>
                        <p>one can help the other up</p>
                    </div>
                    <p className={styles.verseAddress}>Ecclesiastes 4:10</p>
                </div>
            </div>
            {/*<Snackbar open={true} sx={{width: '100%'}} >*/}
            {/*    <Alert severity={'info'}>*/}
            {/*        To do: make embed always loaded in the background like youtube*/}
            {/*    </Alert>*/}
            {/*</Snackbar>*/}
        </main>
    )
}

export default Livestreaming;
