import {PageHeader, Menu, Affix} from 'antd';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

const topScrollTarget = 200;

const HeaderNavigator = props => {
    const [andText, setAndText] = useState('Und');
    const [trackedYOffset, setTrackedYOffset] = useState(0);
    const router = useRouter();

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

    /**
     * Dynamic Header Logo/Title
     *
     * @param props
     * @returns {JSX.Element}
     */
    const HeaderTitle = props => {
        return (
            /* Link to Home */
            <Link href={'/'}>
                <a style={{color: `hsl(0, 0%, ${((trackedYOffset / topScrollTarget) < .5) ? '0' : '100'}%`}}>
                    Fec
                    <span style={{color: '#f99544'}}>{andText}</span>
                    Grace
                </a>
            </Link>
        )
    };
    
    return (
        <Affix offsetTop={0} style={{
            position: router.pathname === '/' ? 'absolute' : 'relative',
            width: '100%',
            zIndex: 99,
        }}>
        <PageHeader
            title={<HeaderTitle />}
            style={{
                backgroundColor: `rgba(150, 71, 18, ${((trackedYOffset > topScrollTarget) ? topScrollTarget : trackedYOffset)/topScrollTarget*0.8})`,
                position: 'relative',
                height: '100%',
            }}
            extra={[
                <Menu mode={'horizontal'} selectedKeys={[router.pathname]} key={'nav-menu'} style={{
                }}>
                    {/* Live Streaming Route */}
                    <Menu.Item key={'/livestreaming'}>
                        <Link href={'/livestreaming'}>
                            <a>
                                Livestreaming
                            </a>
                        </Link>
                    </Menu.Item>
                    {/* Gallery Route */}
                    <Menu.Item key={'/gallery'}>
                        <Link href={'/gallery'}>
                            <a>
                                Gallery
                            </a>
                        </Link>
                    </Menu.Item>
                </Menu>
            ]}
        >
        </PageHeader>
        </Affix>
    );
};


export default HeaderNavigator;
