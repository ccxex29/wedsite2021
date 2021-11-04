import {isValidElement} from 'react';
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

const TimelineView = (props: { dimensions: { height: number, width: number } }) => {
    const {dimensions} = props;
    const heights = {
        startingHeight: 5,
        totalHeight: 300,
    }
    const timings = {
        start: dimensions.height * 1.0,
        dotTimeout: 75,
        connectorTimeout: 200,
        textTimeout: 75,
    }
    const decorationWait = timings.dotTimeout + timings.connectorTimeout;

    const timelineContents = [
        {
            'title': 'Grace & Fecund Met for the 1st Time',
            'body': 'They met in the university',
            'date': 'September 2010',
        },
        {
            'title': 'Grace & Fecund Went on Their 1st Date',
            'body': 'The watched classical music concert in Goethe Haus',
            'date': <span>2<sup>nd</sup> July, 2011</span>,
        },
        {
            'title': 'Grace & Fecund Travelled Together for the 1st Time',
            'body': 'The chose Jogjakarta as their first destination',
            'date': 'August-September 2013',
        },
        {
            'title': 'Grace & Fecund are Engaged',
            'body': 'They made Tingjing and Sangjit days to be one simple ceremony',
            'date': 'May 2021',
        },
        {
            'title': 'Fecund Proposed Grace',
            'body': 'She said YES!',
            'date': <span>25<sup>th</sup> September, 2021</span>,
        },
        {
            'title': 'The Day will be Remembered Forever',
            'body': 'A small ceremony will be held that all can witness here',
            'date': <span>12<sup>th</sup> November, 2021</span>,
        },
    ];

    const getFlexTimelineJustifyStyle = (position: 'opposite'|'normal') => {
        return position === 'opposite' ? 'flex-end' : 'flex-start';
    }

    const AnimateStoryContent = (props: { children?: JSX.Element[] | JSX.Element | string, index: number, mode: string, position?: string }) => {
        const {index, mode, position} = props;

        if ((position !== 'normal' && position !== 'opposite') && mode === 'date') {
            return null;
        }

        // @ts-ignore
        return (
            <Plx
                key={`tl-our-story-content-${index}-${mode}`}
                parallaxData={[
                    {
                        start: timings.start + ((index + 1) * decorationWait),
                        duration: timings.textTimeout,
                        properties: [
                            {
                                startValue: 0,
                                endValue: 1,
                                property: 'opacity',
                            },
                        ],
                    },
                ]}
                className={`${styles.timelineItemDefaults} ${mode === 'date' ? styles.timelineHead : undefined}`}
                // @ts-ignore
                style={mode === 'date' ? {justifyContent: getFlexTimelineJustifyStyle(position)} : undefined}
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
                    return <AnimateStoryContent index={index} mode={'date'} position={mode}>{data.date}</AnimateStoryContent>;
                } else if (mode === 'normal' && (index & 1)) {
                    return <AnimateStoryContent index={index} mode={'date'} position={mode}>{data.date}</AnimateStoryContent>;
                }
                return (
                    <AnimateStoryContent index={index} mode={'content'}>
                        <div className={styles.timelineHead} style={{justifyContent: getFlexTimelineJustifyStyle(index & 1 ? 'opposite' : 'normal')}}>
                            <h3 className={styles.timelineHeaderStyle}> {data.title || ''} </h3>
                        </div>
                        <p className={styles.timelineContentStyle}> {data.body || ''} </p>
                    </AnimateStoryContent>
                );
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
                            <TimelineDot/>
                            <TimelineConnector/>
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
        <div style={{minHeight: heights.totalHeight * timelineContents.length}}>
            <Timeline>
                {TimelineItemComponent()}
            </Timeline>
        </div>
    );
};

export default TimelineView;
