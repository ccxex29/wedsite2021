import {useEffect, useState} from 'react';
import {Row, Col} from 'antd';
import Image from 'next/image';
import styles from '../styles/HomePage.module.sass';
import TimelineView from '../components/TimelineView';
import InvitationSection from '../components/InvitationSection';
import colours from '../constants/colours';
import NProgress from 'nprogress';
// @ts-ignore
import Plx from 'react-plx';

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
                        src={'wedsite2021/HAN_8747.jpg?q=85&fit=max&auto=format&auto=compress'}
                        // blurDataURL={'https://imgix.femmund.com/wedsite2021/HAN_8747.jpg?w=100'}
                        layout={'fill'}
                        objectFit={'cover'}
                        // placeholder={'blur'}
                        // priority={true}
                        // quality={87}
                        alt={''}
                    />
                </Plx>
                    <Row justify={'center'} align={'middle'} style={{
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        textAlign: 'center',
                    }}>
                        <Col>
                            <h1 style={{
                                color: '#fff',
                                fontSize: 80,
                            }}>{'Title & Title'}</h1>
                        </Col>
                        <Col>
                            <p style={{
                                color: '#fff',
                                fontSize: '1.2em',
                            }}>
                                Some other words maybe?
                            </p>
                        </Col>
                    </Row>
            </section>
            <section aria-label={'Our Story Section'} id={'section-our-story'} style={{
                position: 'relative',
                paddingBlock: 100,
                backgroundColor: colours.white,
            }}>
                <h2 style={{textAlign: 'center', marginBottom: 75, fontWeight: 'bold', fontSize: '2rem',}}>Our Story</h2>
                <p style={{
                    fontSize: '1.2rem',
                    paddingInline: '6rem',
                    paddingBottom: '4rem',
                }}>
                    {someStoryText}
                </p>
                <TimelineView dimensions={dimensions} />
            </section>
            <section aria-label={'Welcome Invitation Section'} id={'section-welcome-invitation'} className={styles.welcomeInvitation}>
                <h2 aria-label={'Welcome Invitation'}>
                    Wherever you are, we delightfully invite you to witness our vows and share the joy with us virtually
                </h2>
            </section>
            <section aria-label={'Schedule Invitation Section'}>
                <InvitationSection />
            </section>
        </main>
    )
};

export default Home;
