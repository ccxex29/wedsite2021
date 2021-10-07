import {useEffect, useState} from 'react';
import {Typography, Row, Col} from 'antd';
import Image from 'next/image';
import styles from '../styles/HomePage.module.sass';
import dimensionsType from '../constants/types/dimensionsType';
import TimelineView from '../components/TimelineView';
import InvitationSection from '../components/InvitationSection';
// @ts-ignore
import Plx from 'react-plx';

const {Title, Text} = Typography;


const Home = (): JSX.Element => {
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
            console.log(dimensions, window.innerWidth, window.innerHeight);
        };
        trackDimensions();
        window.addEventListener('resize', trackDimensions);
        return () => {
            window.removeEventListener('resize', trackDimensions);
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
                        src={'wedsite2021/HAN_8747.jpg'}
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
                            <Title style={{
                                color: '#fff',
                                fontSize: 80,
                            }}>Title & Title</Title>
                        </Col>
                        <Col>
                            <Title level={4} style={{
                                color: '#fff'
                            }}>
                                Some other words maybe?
                            </Title>
                        </Col>
                    </Row>
            </section>
            <section id={'section-our-story'} style={{
                position: 'relative',
                padding: 100,
            }}>
                <Title level={1} style={{textAlign: 'center', marginBottom: 75}}>Our Story</Title>
                <TimelineView dimensions={dimensions} />
            </section>
            <section className={styles.welcomeInvitation}>
                <div>
                    <Text>Wherever you are, we delightfully invite you to witness our vows and share the joy with us virtually</Text>
                </div>
            </section>
            <section>
                <InvitationSection />
            </section>
        </main>
    )
};

// export const getStaticProps: GetStaticProps = async () => {
//     let imageCover: any = await axios.get('https://imgix.femmund.com/wedsite2021/HAN_8747.jpg', {responseType: 'arraybuffer'});
//     imageCover = Buffer.from(imageCover.data).toString('base64');
//     return {
//         props: {
//             imageCover,
//         }
//     }
// }

export default Home;
