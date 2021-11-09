import {CSSProperties, isValidElement} from 'react';
import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from '@mui/lab';
// @ts-ignore
import Plx from 'react-plx';

import styles from '../styles/TimelineView.module.sass';
import colours from '../constants/colours';

// Icons
import campusLifeIcon from '../public/images/campus_life.svg';
import musicIcon from '../public/images/music.svg';
import travellingIcon from '../public/images/travelling.svg';
import sangjitIcon from '../public/images/sangjit.svg';
import proposeIcon from '../public/images/propose.svg';
import weddingDayIcon from '../public/images/wedding_day.svg';
import Link from 'next/link';

type AnimateStoryContentPropsType = {
    children?: JSX.Element[] | JSX.Element | string,
    index: number,
    mode: string,
    position?: string,
    animateProperties?: {
        startValue?: number,
        endValue?: number,
        property?: string
    }[],
    shouldWaitForText?: boolean,
    shouldWaitForDecoration?: boolean,
    customWaitDuration?: number,
    style?: CSSProperties,
}

const TimelineView = (props: { dimensions: { height: number, width: number } }) => {
    const {dimensions} = props;
    const heights = {
        startingHeight: 140,
        totalHeight: 300,
        iconSize: dimensions.width < 480 ? 64 : 128,
    }
    const timings = {
        start: dimensions.height - 400,
        dotTimeout: 100,
        connectorTimeout: 200,
        textTimeout: 100,
    }
    const decorationWait = timings.dotTimeout + timings.connectorTimeout;

    const timelineContents = [
        {
            title: 'Grace & Fecund Met for the 1st Time',
            body: 'They met in the university',
            date: '09.2010',
            icon: {
                'src': campusLifeIcon,
                'alt': 'Campus Life',
            },
        },
        {
            title: 'Grace & Fecund Went on Their 1st Date',
            body: 'The watched classical music concert in Goethe Haus',
            date: '02.07.2011',
            icon: {
                src: musicIcon,
                alt: 'Music',
            },
        },
        {
            title: 'Grace & Fecund Travelled Together for the 1st Time',
            body: 'The chose Jogjakarta as their first destination',
            date: '09.2013',
            icon: {
                src: travellingIcon,
                alt: 'Music',
            },
        },
        {
            title: 'Grace & Fecund are Engaged',
            body: 'They made Tingjing and Sangjit days to be one simple ceremony',
            date: '03.05.2021',
            icon: {
                src: sangjitIcon,
                alt: 'Sangjit',
            },
        },
        {
            title: 'Fecund Proposed Grace',
            body: 'She said YES!',
            date: '25.09.2021',
            icon: {
                src: proposeIcon,
                alt: 'Proposal',
            },
        },
        {
            title: 'The Day will be Remembered Forever',
            body: <span>A small ceremony will be held that all can witness <Link href={'/livestreaming'}><a className={'noDecoration'}><span className={styles.boldUnderline} style={{color: colours.white}}>here</span></a></Link></span>,
            date: '12.11.2021',
            icon: {
                src: weddingDayIcon,
                alt: 'Wedding Day',
            },
        },
    ];

    const getFlexTimelineJustifyStyle = (position: 'opposite' | 'normal') => {
        return position === 'opposite' ? 'flex-end' : 'flex-start';
    }

    const AnimateStoryContent = (props: AnimateStoryContentPropsType) => {
        const {index, mode, position, animateProperties, customWaitDuration, style} = props;
        let {shouldWaitForText, shouldWaitForDecoration} = props
        shouldWaitForText = shouldWaitForText ?? true;
        shouldWaitForDecoration = shouldWaitForDecoration ?? true;

        if ((position !== 'normal' && position !== 'opposite') && mode === 'date') {
            return null;
        }

        return (
            <Plx
                key={`tl-our-story-content-${index}-${mode}`}
                parallaxData={[
                    {
                        start: timings.start + (shouldWaitForDecoration ? (index + (shouldWaitForText ? 1 : 0)) * decorationWait : (index * (customWaitDuration ?? 0))),
                        duration: timings.textTimeout,
                        properties: animateProperties ? animateProperties : [
                            {
                                startValue: 0,
                                endValue: 1,
                                property: 'opacity',
                            },
                        ],

                    },
                ]}
                className={`${animateProperties ? '' : styles.timelineItemDefaults} ${mode === 'date' ? styles.timelineHead : ''}`}
                style={mode === 'date' ? {
                    ...style,
                    // @ts-ignore
                    justifyContent: getFlexTimelineJustifyStyle(position),
                    height: heights.iconSize,
                    color: colours.primary,
                } : mode === 'icon' ? style ?? {} : undefined}
            >
                {isValidElement(props.children) ? props.children : <div style={style}>{props.children}</div>}
            </Plx>
        )
    }

    const TimelineItemComponent = () => {
        const plxComponents: JSX.Element[] = [];

        timelineContents.forEach((data, index) => {
            const isLastIndex = (): boolean => {
                return index === timelineContents.length - 1;
            };

            const content = (mode: string) => {
                const headerFontSize = dimensions.width < 620 ? '1rem' : dimensions.width < 800 ? '1.2rem' : '1.5rem';
                const bodyFontSize = dimensions.width < 620 ? '0.8rem' : dimensions.width < 800 ? '1rem' : '1.2rem';

                if (mode === 'opposite' && !(index & 1)) {
                    return (
                        <AnimateStoryContent
                            index={index}
                            mode={'date'}
                            position={mode}
                            shouldWaitForDecoration={false}
                            style={{
                                fontSize: headerFontSize,
                                fontWeight: 600,
                            }}
                        >
                            <>
                                <span style={{
                                    marginRight: 10,
                                    color: isLastIndex() ? colours.white : colours.primary,
                                }}>
                                {data.date}
                                </span>
                                <span style={{
                                    width: heights.iconSize / 2 + 20,
                                    marginRight: -heights.iconSize / 2,
                                    backgroundColor: isLastIndex() ? colours.white : colours.primary,
                                }}
                                      className={styles.uselessDateLine}>
                                </span>
                            </>
                        </AnimateStoryContent>
                    );
                } else if (mode === 'normal' && (index & 1)) {
                    return (
                        <AnimateStoryContent
                            index={index}
                            mode={'date'}
                            position={mode}
                            shouldWaitForDecoration={false}
                            style={{
                                fontSize: headerFontSize,
                                color: isLastIndex() ? colours.white : colours.primary,
                                fontWeight: 600,
                            }}
                        >
                            <>
                                <span style={{
                                    width: heights.iconSize / 2 + 20,
                                    marginLeft: -heights.iconSize / 2,
                                    backgroundColor: isLastIndex() ? colours.white : colours.primary,
                                }}
                                      className={styles.uselessDateLine}>
                                </span>
                                <span style={{
                                    marginLeft: 10,
                                    color: isLastIndex() ? colours.white : colours.primary,
                                }}>
                                    {data.date}
                                </span>
                            </>
                        </AnimateStoryContent>
                    );
                }

                return (
                    <AnimateStoryContent index={index} mode={'content'} shouldWaitForDecoration={false}
                                         style={{display: 'flex', flexDirection: 'column'}}>
                        <div className={styles.timelineHead}
                             style={{
                                 minHeight: heights.iconSize,
                                 flexDirection: 'column',
                                 justifyContent: 'center',
                                 alignItems: getFlexTimelineJustifyStyle(index & 1 ? 'opposite' : 'normal'),
                             }}>
                            <h3 style={{
                                fontSize: headerFontSize,
                                color: isLastIndex() ? colours.white : colours.primary,
                            }}
                                className={styles.timelineHeaderStyle}>
                                {data.title || ''}
                            </h3>
                            <p className={styles.timelineBodyStyle}
                               style={{
                                   fontSize: bodyFontSize,
                                   color: isLastIndex() ? colours.white : colours.primary,
                               }}> {data.body || ''} </p>
                        </div>
                    </AnimateStoryContent>
                );
            }
            const TimelineIcon = () => {

                if (data.icon) {
                    return (
                        <div style={{
                            height: heights.iconSize,
                            width: heights.iconSize,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexShrink: 0,
                        }}>
                            <AnimateStoryContent
                                index={index}
                                mode={'icon'}
                                shouldWaitForDecoration={false}
                                customWaitDuration={decorationWait}
                                animateProperties={
                                    [
                                        {
                                            property: 'height',
                                            startValue: 0,
                                            endValue: heights.iconSize,
                                        },
                                        {
                                            property: 'width',
                                            startValue: 0,
                                            endValue: heights.iconSize,
                                        },
                                    ]
                                }
                                style={{
                                    backgroundColor: isLastIndex() ? colours.white : colours.primary,
                                    borderRadius: '50%',
                                    zIndex: 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    overflow: 'hidden',
                                }}
                            >
                                <data.icon.src height={'calc(100% - 10px)'} zIndex={1}/>
                            </AnimateStoryContent>
                        </div>
                    );
                }
                return <TimelineDot/>;
            }

            plxComponents.push(
                <Plx
                    key={`tl-our-story-${index}`}
                    className={styles.timelineItemWrapperParallaxDefault}
                    parallaxData={[
                        {
                            start: timings.start + (index * decorationWait),
                            duration: timings.dotTimeout,
                            properties: [
                                {
                                    startValue: 0,
                                    endValue: 1,
                                    property: 'opacity',
                                },
                            ],
                        },
                        {
                            start: timings.start + (index * decorationWait) + timings.dotTimeout,
                            duration: timings.connectorTimeout,
                            properties: [
                                {
                                    startValue: heights.startingHeight,
                                    endValue: heights.totalHeight,
                                    property: 'height',
                                },
                            ],
                        },
                    ]}
                >
                    <TimelineItem className={styles.timelineItemWrapper}>
                        <TimelineOppositeContent>
                            {content('opposite')}
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            {TimelineIcon()}
                        </TimelineSeparator>
                        <TimelineContent>
                            {content('normal')}
                        </TimelineContent>
                    </TimelineItem>
                </Plx>,
            );
        });

        return plxComponents;
    }

    return (
        <>
            <h2 className={styles.howWeMetHeader}>How We Met</h2>
            <div style={{minHeight: heights.totalHeight * timelineContents.length + 20}}>
                <Timeline>
                    {TimelineItemComponent()}
                </Timeline>
            </div>
        </>
    );
};

export default TimelineView;
