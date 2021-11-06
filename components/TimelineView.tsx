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

const TimelineView = (props: { dimensions: { height: number, width: number } }) => {
    const {dimensions} = props;
    const heights = {
        startingHeight: 140,
        totalHeight: 400,
        iconHeight: 128,
    }
    const timings = {
        start: dimensions.height - 400,
        dotTimeout: 125,
        connectorTimeout: 250,
        textTimeout: 125,
    }
    const decorationWait = timings.dotTimeout + timings.connectorTimeout;

    const timelineContents = [
        {
            title: 'Grace & Fecund Met for the 1st Time',
            body: 'They met in the university',
            date: 'September 2010',
            icon: {
                'src': campusLifeIcon,
                'alt': 'Campus Life',
            },
        },
        {
            title: 'Grace & Fecund Went on Their 1st Date',
            body: 'The watched classical music concert in Goethe Haus',
            date: <span>2<sup>nd</sup> July, 2011</span>,
            icon: {
                src: musicIcon,
                alt: 'Music',
            },
        },
        {
            title: 'Grace & Fecund Travelled Together for the 1st Time',
            body: 'The chose Jogjakarta as their first destination',
            date: 'August-September 2013',
            icon: {
                src: travellingIcon,
                alt: 'Music',
            },
        },
        {
            title: 'Grace & Fecund are Engaged',
            body: 'They made Tingjing and Sangjit days to be one simple ceremony',
            date: 'May 2021',
            icon: {
                src: sangjitIcon,
                alt: 'Sangjit',
            },
        },
        {
            title: 'Fecund Proposed Grace',
            body: 'She said YES!',
            date: <span>25<sup>th</sup> September, 2021</span>,
            icon: {
                src: proposeIcon,
                alt: 'Proposal',
            },
        },
        {
            title: 'The Day will be Remembered Forever',
            body: 'A small ceremony will be held that all can witness here',
            date: <span>12<sup>th</sup> November, 2021</span>,
            icon: {
                src: weddingDayIcon,
                alt: 'Wedding Day',
            },
        },
    ];

    const getFlexTimelineJustifyStyle = (position: 'opposite' | 'normal') => {
        return position === 'opposite' ? 'flex-end' : 'flex-start';
    }

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
                    // @ts-ignore
                    justifyContent: getFlexTimelineJustifyStyle(position),
                    height: heights.iconHeight,
                    color: colours.tertiary,
                    fontSize: '1.20em',
                } : mode === 'icon' ? style ?? {} : undefined}
            >
                {isValidElement(props.children) ? props.children : <div>{props.children}</div>}
            </Plx>
        )
    }

    const TimelineItemComponent = () => {
        const plxComponents: JSX.Element[] = [];

        timelineContents.forEach((data, index) => {
            const content = (mode: string) => {
                if (mode === 'opposite' && !(index & 1)) {
                    return (
                        <AnimateStoryContent
                            index={index}
                            mode={'date'}
                            position={mode}
                            shouldWaitForDecoration={false}
                        >
                            {data.date}
                        </AnimateStoryContent>
                    );
                } else if (mode === 'normal' && (index & 1)) {
                    return (
                        <AnimateStoryContent
                            index={index}
                            mode={'date'}
                            position={mode}
                            shouldWaitForDecoration={false}
                        >
                            {data.date}
                        </AnimateStoryContent>
                    );
                }
                return (
                    <AnimateStoryContent index={index} mode={'content'} shouldWaitForDecoration={false}>
                        <div className={styles.timelineHead}
                             style={{justifyContent: getFlexTimelineJustifyStyle(index & 1 ? 'opposite' : 'normal')}}>
                            <h3 style={{height: heights.iconHeight}}
                                className={styles.timelineHeaderStyle}> {data.title || ''} </h3>
                        </div>
                        <p className={styles.timelineBodyStyle}> {data.body || ''} </p>
                    </AnimateStoryContent>
                );
            }
            const TimelineIcon = () => {
                if (data.icon) {
                    return (
                        <div style={{
                            height: heights.iconHeight,
                            width: heights.iconHeight,
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
                                            endValue: heights.iconHeight,
                                        },
                                        {
                                            property: 'width',
                                            startValue: 0,
                                            endValue: heights.iconHeight,
                                        },
                                    ]
                                }
                            >
                                <data.icon.src height={'100%'}/>
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
                            {
                                index == timelineContents.length-1 ? <></> : <TimelineConnector/>
                            }
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
        <div style={{minHeight: heights.totalHeight * timelineContents.length + 100}}>
            <Timeline>
                {TimelineItemComponent()}
            </Timeline>
        </div>
    );
};

export default TimelineView;
