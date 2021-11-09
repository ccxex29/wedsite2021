import Plyr from 'plyr';
import styles from '../styles/OurStory.module.sass';
import {useEffect, useRef} from 'react';
import NProgress from 'nprogress';
import Link from 'next/link';

const ourStoryText = "Grace and Fecund first met in university through a campus event in Binus University. Grace was a freshman, and Fecund was a sophomore at that time. After Grace's first year, she accidentally met Fecund again, and after seven months of going out together, they finally in a relationship. They used to wait for each other to meet after class to have lunch together, try new cafes or eat their favourite foods. Also, sometimes they did school's projects together. They have different hobbies like Grace adores classical music, so she takes Fecund to classical concerts and introduces many songs. She also loves travelling so she asked him to go with her, tried going to new destinations and now, he can't wait to go to more places with her. Fecund likes films, so he often takes Grace to the cinema. He is more capable of design; it makes him help and teaches her a lot of it. Fun fact, he is neater, cleaner and calmer than Grace, but Grace is well-managed and able to think faster. So, they ideally fit and help each other. After almost ten years of cherishing every moment together, they decided to take a new step in their lives to start a new family."
const cdnUri = 'https://cdn.femmund.com/file/femmund-cdn/wedsite2021';
const OurStory = () => {
    const imagePath = useRef('https://imgix.femmund.com/wedsite2021/HAN_8688.jpg?fit=clip&h=1440&q=75&auto=compress,format');
    useEffect(() => {
        const player = new Plyr('#player', {
            quality: {
                default: 720,
                options: [
                    480, 720, 1080
                ]
            },
            volume: 0.5,
        });
        player.poster = imagePath.current;
        player.source = {
            type: 'video',
            title: 'Our Story',
            sources: [
                {
                    src: `${cdnUri}/videos/480p_story_vs.m4v`,
                    type: 'video/mp4',
                    size: 480,
                },
                {
                    src: `${cdnUri}/videos/720p_story_vs.m4v`,
                    type: 'video/mp4',
                    size: 720,
                },
                {
                    src: `${cdnUri}/videos/1080p_story_vs.m4v`,
                    type: 'video/mp4',
                    size: 1080,
                },
            ]
        }
        player.on('playing', event => {
            const poster = document.querySelector('[class^=OurStory] .plyr__poster');
            if (!poster) {
                return;
            }
            // @ts-ignore
            poster.style.opacity = 0;
        })
        NProgress.done();
    }, []);
    return (
        <main className={styles.cover}>
            <div className={styles.playerWrapper}>
                <div className={styles.playerAdjuster}>
                    <video id={'player'} playsInline controls data-poster={imagePath.current} />
                </div>
            </div>
            <div className={styles.theStorySection}>
                <h1 className={styles.theStoryHeader}>The Story</h1>
                <p style={{
                    textAlign: 'justify',
                    textAlignLast: 'center',
                }}>
                    {ourStoryText}
                </p>
                <div style={{marginTop: '2.4em'}}>
                    <Link href={'/livestreaming'}>
                        <a>
                            <button className={styles.joinButton}>JOIN US</button>
                        </a>
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default OurStory;
