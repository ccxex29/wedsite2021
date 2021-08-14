import {PageHeader, Menu, Affix} from 'antd';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styles from '../styles/Header.module.css';
import {JSX} from '@babel/types';

/**
 * @type number
 */
const topScrollTarget: number = 200;

const HeaderNavigator = (): JSX.Element => {
    const [andText] = useState('Und');
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

    const isLivestreaming = (): boolean => {
        return router.pathname === '/livestreaming';
    };

    const isHome = (): boolean => {
        return router.pathname === '/';
    };

    const isGallery = (): boolean => {
        return router.pathname === '/gallery';
    };

    /**
     * Dynamic Header Logo/Title
     *
     * @returns {JSX.Element}
     */
    const HeaderTitle = (): JSX.Element => {
        return (
            /* Link to Home */
            <Link href={'/'}>
                <a className={styles.titleLogo}
                   style={{
                       color: !isHome() ? '#000' : `hsl(0, 0%, 100%`,
                       transition: 'color 0.5s ease-in',
                   }}>
                    Fec
                    <span style={{color: '#f99544'}}>{andText}</span>
                    Grace
                </a>
            </Link>
        )
    };

    /**
     * Controls how the header would slowly fade
     *
     * @return {JSX.Element}
     */
    const DynamicHeader = (): JSX.Element => {
        return (
            <PageHeader
                title={<HeaderTitle/>}
                style={{
                    backgroundColor:
                        isLivestreaming() ?
                            'unset' :
                            `rgba(150, 71, 18, ${((trackedYOffset > topScrollTarget) ? topScrollTarget : trackedYOffset) / topScrollTarget * 0.8})`,
                    position: 'relative',
                    height: '100%',
                }}
                extra={[
                    <Menu mode={'horizontal'} selectedKeys={[router.pathname]} key={'nav-menu'} className={styles.menu}>
                        {/* Live Streaming Route */}
                        <Menu.Item key={'/livestreaming'} className={styles.menuItem}>
                            <Link href={'/livestreaming'}>
                                <a>
                                    Livestreaming
                                </a>
                            </Link>
                        </Menu.Item>
                        {/* Gallery Route */}
                        <Menu.Item key={'/gallery'} className={styles.menuItem}>
                            <Link href={'/gallery'}>
                                <a>
                                    Gallery
                                </a>
                            </Link>
                        </Menu.Item>
                    </Menu>,
                ]}
            >
            </PageHeader>
        );
    }

    if (isLivestreaming()) {
        return (
            <DynamicHeader/>
        );
    }

    return (
        <Affix offsetTop={0} style={{
            position: isHome() ? 'absolute' : 'relative',
            width: '100%',
            zIndex: 99,
        }}>
            <DynamicHeader/>
        </Affix>
    );
};


export default HeaderNavigator;
