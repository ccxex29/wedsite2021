import {
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator,
} from '@mui/lab';
import {Skeleton, Typography} from 'antd';
// @ts-ignore
import Plx from 'react-plx';
import {Timeline} from '@mui/lab';
import styles from '../styles/TimelineView.module.css';

const {Title, Text} = Typography;

const TimelineView = (props: {dimensions: {height: number, width: number}}) => {
    const {dimensions} = props;

    const pTimelineText1 = [
        {
            start: dimensions.height * .6 + 150,
            duration: 50,
            properties: [
                {
                    startValue: 0,
                    endValue: 1,
                    property: 'opacity',
                },
            ]
        }
    ];
    const pTimelineText2 = [
        {
            start: dimensions.height * .6 + 300,
            duration: 50,
            properties: [
                {
                    startValue: 0,
                    endValue: 1,
                    property: 'opacity',
                },
            ]
        }
    ];
    const pTimelineText3 = [
        {
            start: dimensions.height * .6 + 600,
            duration: 100,
            properties: [
                {
                    startValue: 0,
                    endValue: 1,
                    property: 'opacity',
                },
            ]
        }
    ];
    const pTimelineText4 = [
        {
            start: dimensions.height * .6 + 800,
            duration: 100,
            properties: [
                {
                    startValue: 0,
                    endValue: 1,
                    property: 'opacity',
                },
            ]
        }
    ];

    const pTimeline1 = [
        {
            start: dimensions.height * .6,
            duration: 50,
            properties: [
                {
                    startValue: 0,
                    endValue: 1,
                    property: 'opacity',
                }
            ]
        },
        {
            start: dimensions.height * .6 + 50,
            duration: 100,
            properties: [
                {
                    startValue: 5,
                    endValue: 200,
                    property: 'height',
                },
            ],
        }
    ];
    const pTimeline2 = [
        {
            start: dimensions.height * .6 + 200,
            duration: 50,
            properties: [
                {
                    startValue: 0,
                    endValue: 1,
                    property: 'opacity',
                }
            ]
        },
        {
            start: dimensions.height * .6 + 300,
            duration: 100,
            properties: [
                {
                    startValue: 5,
                    endValue: 200,
                    property: 'height',
                },
            ],
        }
    ];
    const pTimeline3 = [
        {
            start: dimensions.height * .6 + 400,
            duration: 100,
            properties: [
                {
                    startValue: 0,
                    endValue: 1,
                    property: 'opacity',
                }
            ]
        },
        {
            start: dimensions.height * .6 + 500,
            duration: 100,
            properties: [
                {
                    startValue: 5,
                    endValue: 200,
                    property: 'height',
                },
            ],
        }
    ];
    const pTimeline4 = [
        {
            start: dimensions.height * .6 + 600,
            duration: 100,
            properties: [
                {
                    startValue: 0,
                    endValue: 1,
                    property: 'opacity',
                }
            ]
        },
        {
            start: dimensions.height * .6 + 700,
            duration: 100,
            properties: [
                {
                    startValue: 5,
                    endValue: 200,
                    property: 'height',
                },
            ],
        }
    ];

    return (
        <div style={{minHeight: 600}}>
            <Timeline>
                <Plx
                    className={styles.timelineItemWrapperParallaxDefault}
                    parallaxData={pTimeline1}
                >
                    <TimelineItem className={styles.timelineItemWrapper}>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Plx
                                key={'tl-1'}
                                parallaxData={pTimelineText1}
                                className={styles.timelineItemDefaults}
                            >
                                <Text>
                                    <Skeleton active />
                                </Text>
                            </Plx>
                        </TimelineContent>
                    </TimelineItem>
                </Plx>
                <Plx
                    className={styles.timelineItemWrapperParallaxDefault}
                    parallaxData={pTimeline2}
                >
                    <TimelineItem className={styles.timelineItemWrapper}>
                        <TimelineOppositeContent>
                            <Plx
                                key={'tl-2'}
                                parallaxData={pTimelineText2}
                                className={styles.timelineItemDefaults}
                            >
                                <Text>
                                    <Skeleton active />
                                </Text>
                            </Plx>
                        </TimelineOppositeContent>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                        </TimelineContent>
                    </TimelineItem>
                </Plx>
                {/*<TimelineItem className={styles.timelineItemWrapper}>*/}
                {/*    <TimelineSeparator>*/}
                {/*        <TimelineDot />*/}
                {/*        <TimelineConnector />*/}
                {/*    </TimelineSeparator>*/}
                {/*    <TimelineContent>*/}
                {/*        <Plx*/}
                {/*            key={'tl-3'}*/}
                {/*            parallaxData={pTimeline3}*/}
                {/*            className={styles.timelineItemDefaults}*/}
                {/*        >*/}
                {/*            <Text style={{textAlign: 'right'}}>*/}
                {/*                <Skeleton active />*/}
                {/*            </Text>*/}
                {/*        </Plx>*/}
                {/*    </TimelineContent>*/}
                {/*</TimelineItem>*/}
                {/*<TimelineItem className={styles.timelineItemWrapper}>*/}
                {/*    <TimelineOppositeContent>*/}
                {/*        <Plx*/}
                {/*            key={'tl-4'}*/}
                {/*            parallaxData={pTimeline4}*/}
                {/*            className={styles.timelineItemDefaults}*/}
                {/*        >*/}
                {/*            <Text>*/}
                {/*                <Skeleton active />*/}
                {/*            </Text>*/}
                {/*        </Plx>*/}
                {/*    </TimelineOppositeContent>*/}
                {/*    <TimelineSeparator>*/}
                {/*        <TimelineDot />*/}
                {/*        <TimelineConnector />*/}
                {/*    </TimelineSeparator>*/}
                {/*    <TimelineContent>*/}
                {/*    </TimelineContent>*/}
                {/*</TimelineItem>*/}
            </Timeline>
        </div>
    );
};

export default TimelineView;
