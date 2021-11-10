import Image from 'next/image';
import TimelineView from '../components/TimelineView';
import InvitationSection from '../components/InvitationSection';
import WelcomeInvitation from '../components/WelcomeInvitation';
import useWindowSize from '../components/hooks/useWindowSize';
import {Link} from 'react-scroll';

import styles from '../styles/HomePage.module.sass';

import colours from '../constants/colours';
import NProgress from 'nprogress';

// @ts-ignore
import Plx from 'react-plx';
import {BsArrowDownCircle as ArrowDown} from 'react-icons/bs';

const Home = (): JSX.Element => {
    NProgress.done();
    const {width, height} = useWindowSize();
    const dimensions = {
        width,
        height,
    };

    const shouldUseAltImage = () => {
        return width < (0.95 * height);
    }

    const getImageUrl = () => {
        if (shouldUseAltImage()) {
            return 'wedsite2021/HAN_8788.jpg?q=70&fit=clip&auto=format,compress&w=1440'
        }
        return 'wedsite2021/HAN_8747.jpg?q=70&fit=clip&auto=format,compress&h=1440';
    }

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
                        src={getImageUrl()}
                        layout={'fill'}
                        objectFit={'cover'}
                        alt={''}
                    />
                </Plx>
                <Link to={'section-how-we-met'} smooth={true}>
                    <div className={styles.scrollerWrapper} style={{
                        backgroundImage: 'linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 50%)',
                        alignItems: shouldUseAltImage() ? 'flex-end' : 'center',
                        paddingRight: shouldUseAltImage() ? 50 : 'unset',
                    }}>
                        <span style={{fontSize: '1.4rem', opacity: shouldUseAltImage() ? 0 : 1}}>Click to scroll</span>
                        <ArrowDown style={{
                            height: 40,
                            width: 'auto',
                            marginTop: 10,
                        }} />
                    </div>
                </Link>
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
