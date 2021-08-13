import styles from '../styles/Livestreaming.module.css';

const livestreaming = props => {
    const contentId = 'dQw4w9WgXcQ';
    return (
        <div className={styles.cover}>
            <iframe 
                className={styles.embed}
                src={`https://www.youtube-nocookie.com/embed/${contentId}?&showsearch=0&rel=0&color=white`}
                title="Watch via Youtube" frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen>
            </iframe>
        </div>
    )
}

export default livestreaming;