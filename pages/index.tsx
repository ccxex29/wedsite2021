import {useEffect, useState} from 'react';
import Image from 'next/image';
import styles from '../styles/HomePage.module.sass';
import TimelineView from '../components/TimelineView';
import InvitationSection from '../components/InvitationSection';
import colours from '../constants/colours';
import NProgress from 'nprogress';
// @ts-ignore
import Plx from 'react-plx';
import WelcomeInvitation from '../components/WelcomeInvitation';

const someStoryText =
"Grace and Fecund first met in university through a campus event in Binus University. Grace was a freshman, and Fecund was a sophomore at that time.  After Grace's first year, she accidentally met Fecund again, and after seven months of going out together, they finally in a relationship. They used to wait for each other to meet after class to have lunch together, try new cafes or eat their favourite foods. Also, sometimes they did school's projects together. They had different hobbies like Grace adores classical music, so she takes Fecund to watch classical concerts and introduces many songs. She also loves travelling, she asked him to go with her, tried going to new destinations and now, he can't wait to go to more places with her. Fecund likes films, so he often takes Grace to the cinema. He is more capable of design; it makes him help and teaches her a lot of it. Fun fact, he is neater, cleaner and calmer than Grace. But, Grace is well-managed and able to think faster. So, they ideally fit and help each other. After almost ten years and cherishing every moment together, they decided to take a new step in their life to start a new family."

const Home = (): JSX.Element => {
    NProgress.done();
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        const trackDimensions = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };
        trackDimensions();
        document.addEventListener('resize', trackDimensions);
        return () => {
            document.removeEventListener('resize', trackDimensions);
        }
    }, []);

    const parallaxImgCoverData = [
        {
            start: 0,
            end: dimensions.height,
            properties: [
                {
                    startValue: 0,
                    endValue: .25 * dimensions.height,
                    property: 'translateY',
                },
            ]
        },
        {
            start: 0,
            end: dimensions.height * .5,
            properties: [
                {
                    startValue: 0,
                    endValue: 1,
                    property: 'grayscale'
                }
            ]
        }
    ];

    return (
        <main>
            <section style={{
                height: '100vh',
                overflow: 'hidden',
                position: 'relative',
            }}>
                <Plx
                    key={'cover-img-plx'}
                    className={styles.imageCoverWrapper}
                    parallaxData={parallaxImgCoverData}
                >
                    <Image
                        className={styles.imageCover}
                        src={'wedsite2021/HAN_8747.jpg?q=70&fit=clip&auto=format&auto=compress&h=1440'}
                        layout={'fill'}
                        objectFit={'cover'}
                        alt={''}
                    />
                </Plx>
            </section>
            <section aria-label={'How We Met'} id={'section-how-we-met'} style={{
                position: 'relative',
                padding: '100px 0',
                backgroundColor: colours.tertiary,
            }}>
                <TimelineView dimensions={dimensions} />
            </section>
            <section aria-label={'Welcome Invitation Section'} id={'section-welcome-invitation'} className={styles.welcomeInvitation}>
                <WelcomeInvitation />
            </section>
            <section aria-label={'Schedule Invitation Section'}>
                <InvitationSection />
            </section>
        </main>
    )
};

export default Home;
