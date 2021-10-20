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
                            <h3 style={{
                                color: '#fff'
                            }}>
                                Some other words maybe?
                            </h3>
                        </Col>
                    </Row>
            </section>
            <section id={'section-our-story'} style={{
                position: 'relative',
                paddingBlock: 100,
                backgroundColor: colours.white,
            }}>
                <h1 style={{textAlign: 'center', marginBottom: 75, fontWeight: 'bold', fontSize: '2rem',}}>Our Story</h1>
                <TimelineView dimensions={dimensions} />
            </section>
            <section className={styles.welcomeInvitation}>
                <div>
                    <span>Wherever you are, we delightfully invite you to witness our vows and share the joy with us virtually</span>
                </div>
            </section>
            <section>
                <InvitationSection />
            </section>
        </main>
    )
};

export default Home;
