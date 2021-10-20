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

const TimelineView = (props: {dimensions: {height: number, width: number}}) => {
    const {dimensions} = props;

    const timelineContents = [
        {
            'title': 'Test1',
            'body': 'test1',
        },
        {
            'title': 'Test2',
            'body': 'test2',
        },
    ]

    const TimelineItemComponent = () => {
        const plxComponents: JSX.Element[] = [];
        const timings = {
            start: dimensions.height * .6,
            dotTimeout: 50,
            connectorTimeout: 100,
            textTimeout: 50,
        }
        const decorationWait = timings.dotTimeout + timings.connectorTimeout;

        timelineContents.forEach((data, index) => {
            const content = (mode: string) => {
                if (mode === 'opposite' && !(index & 1)) {
                    return null;
                } else if (mode === 'normal' && (index & 1)) {
                    return null;
                }
                return (
                    <Plx
                        key={`tl-our-story-content-${index}`}
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
                                ]
                            },
                        ]}
                        className={styles.timelineItemDefaults}
                    >
                        <h2>
                            {data.title || ''}
                        </h2>
                        <p>
                            {data.body || ''}
                        </p>
                    </Plx>
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
                            ]
                        },
                        {
                            start: timings.start + (index * decorationWait) + timings.dotTimeout,
                            duration: timings.connectorTimeout,
                            properties: [
                                {
                                    startValue: 5,
                                    endValue: 200,
                                    property: 'height',
                                },
                            ]
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
                </Plx>
            );
        });

        return plxComponents;
    }

    return (
        <div style={{minHeight: 600}}>
            <Timeline>
                { TimelineItemComponent() }
            </Timeline>
        </div>
    );
};

export default TimelineView;
