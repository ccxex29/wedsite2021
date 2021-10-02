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

    const pTimeline = [
        {
            start: dimensions.height * .8,
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
    return (
        <div>
                <Timeline>
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Plx
                                key={'tl-1'}
                                parallaxData={pTimeline}
                                className={styles.timelineItemDefaults}
                            >
                                <Text>
                                    <Skeleton active />
                                </Text>
                            </Plx>
                        </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                        <TimelineOppositeContent>
                            <Plx
                                key={'tl-2'}
                                parallaxData={pTimeline}
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
                    <TimelineItem>
                        <TimelineSeparator>
                            <TimelineDot />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Plx
                                key={'tl-3'}
                                parallaxData={pTimeline}
                                className={styles.timelineItemDefaults}
                            >
                                <Text style={{textAlign: 'right'}}>
                                    <Skeleton active />
                                </Text>
                            </Plx>
                        </TimelineContent>
                    </TimelineItem>
                </Timeline>
        </div>
    );
};

export default TimelineView;
