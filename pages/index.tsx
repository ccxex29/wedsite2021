import {useEffect, useState} from 'react';
import {Typography, Row, Col, Steps} from 'antd';
import Image from 'next/image';
import sunflower from '../public/sunflower.webp';

const {Title, Text} = Typography;
const {Step} = Steps;

export default function Home() {
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
                // backgroundImage: 'url(https://images.unsplash.com/photo-1628690530954-c065d38e74d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)',
                // backgroundSize: 'cover',
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
                        style={{
                            width: '100%',
                            // height: '36%',
                            position: 'relative',
                        }}
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
