import {PageHeader, Menu} from 'antd';
import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import styles from '../styles/Header.module.sass';
import colours from '../constants/colours';
import {hexToRgb} from '@mui/system';
import Logo from './svgr/Logo';

/**
 * @type number
 */
const topScrollTarget: number = 200;

const HeaderNavigator = (): JSX.Element => {
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

    const isOurStory = (): boolean => {
        return router.pathname === '/our-story';
    }

    const isHome = (): boolean => {
        return router.pathname === '/';
    };

    const isGallery = (): boolean => {
        return router.pathname === '/gallery';
    };

    const isStaticHeader = (): boolean => {
        return isLivestreaming() || isOurStory();
    }

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
                       color: !isStaticHeader() ? `hsl(0, 0%, 100%)` : '#000',
                   }}
                   aria-label={'Home'}
                >
                    <Logo svgProps={{
                        stroke: isStaticHeader() ? colours.tertiary : colours.primary,
                        fill: isStaticHeader() ? colours.tertiary : colours.primary,
                    }} height={80} width={80} />
                </a>
            </Link>
        )
    };

    const headerTranslucentColor = (): number => {
        return ((trackedYOffset > topScrollTarget) ? topScrollTarget : trackedYOffset) / topScrollTarget * 0.9;
    }

    /**
     * Controls how the header would slowly fade
     *
     * @return {JSX.Element}
     */
    const DynamicHeader = (): JSX.Element => {
        const colourRgbMap = hexToRgb(colours.tertiary).replace(/(^rgb\(|\))/g, '');

        return (
            <PageHeader
                title={<HeaderTitle/>}
                className={styles.pageHeaderStyle}
                style={{
                    backgroundColor:
                        isStaticHeader() ?
                            'unset' :
                            isHome() ?
                            `rgba(${colourRgbMap}, ${headerTranslucentColor()})` :
                            `rgba(${colourRgbMap}, 90%)`,
                }}
                extra={[
                    <Menu mode={'horizontal'}
                          role={'navigation'}
                          aria-label={'Navigation Menu'}
                          selectedKeys={[router.pathname]}
                          key={'nav-menu'}
                          forceSubMenuRender={true}
                          className={styles.menu}
                          style={{
                              // backgroundColor: `rgba(0, 0, 0, ${
                              //     isHome() ? 0.5 - headerTranslucentColor() : '0%'
                              // })`
                          }}
                    >
                        <Menu.Item key={'/our-story'} className={!isStaticHeader() ? styles.menuItemBG : styles.menuItemNoBG}>
                            <Link href={'/our-story'}>
                                <a>
                                    Our Story
                                </a>
                            </Link>
                        </Menu.Item>
                        {/* Live Streaming Route */}
                        <Menu.Item key={'/livestreaming'} className={!isStaticHeader() ? styles.menuItemBG : styles.menuItemNoBG}>
                            <Link href={'/livestreaming'}>
                                <a>
                                    Livestreaming
                                </a>
                            </Link>
                        </Menu.Item>
                        {/* Gallery Route */}
                        <Menu.Item key={'/gallery'} className={!isStaticHeader() ? styles.menuItemBG : styles.menuItemNoBG}>
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

    if (isStaticHeader()) {
        return (
            <DynamicHeader/>
        );
    }

    return (
        <header style={{
            position: 'fixed',
            width: '100%',
            zIndex: 99,
            top: 0,
        }}>
            <DynamicHeader/>
        </header>
    );
};


export default HeaderNavigator;
