import {useEffect, useState} from 'react';
import {Typography, Row, Col, Steps} from 'antd';
import Image from 'next/image';
import sunflower from '../public/sunflower.webp';

const {Title} = Typography;
const {Step} = Steps;

export default function Home(): JSX.Element {
    const [trackedYOffset, setTrackedYOffset] = useState(0);

    useEffect(() => {
        trackYOffset();
        document.addEventListener('scroll', trackYOffset);
        return () => {
            document.removeEventListener('scroll', trackYOffset)
        }
    }, []);

    /**
     * Sync trackedYOffset value to the window Y offset
     *
     * @returns {void}
     */
    const trackYOffset = () => {
        setTrackedYOffset(window.pageYOffset);
    };

    return (
        <main>
            <section style={{
                height: 800,
                overflow: 'hidden',
                position: 'relative',
            }}>
                <div style={{
                    position: 'relative',
                    top: (trackedYOffset * 0.25) - 50,
                    height: '100%',
                    transition: 'top 0.05 ease-in',
                }}>
                    <Image
                        src={sunflower}
                        layout={'responsive'}
                        placeholder={'blur'}
                        priority={false}
                        quality={95}
                    />
                    <Row justify={'center'} align={'middle'} style={{
                        flexDirection: 'column',
                        height: '100%',
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                    }}>
                        <Col>
                            <Title style={{
                                color: '#fff',
                                fontSize: 80,
                            }}>WEEE HOOOO!!</Title>
                        </Col>
                        <Col>
                            <Title level={4} style={{
                                color: '#fff'
                            }}>
                                This is very descriptive... Right?
                            </Title>
                        </Col>
                    </Row>
                </div>
            </section>
            <section style={{
                padding: 100,
            }}>
                <Title level={1} style={{textAlign: 'center', marginBottom: 75}}>Awarr Story</Title>
                <Steps progressDot current={1} direction="vertical">
                    <Step title={'We meet each other'} description={'Description Test'} />
                    <Step title={'And again'} />
                </Steps>
            </section>
        </main>
    )
}
