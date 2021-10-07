import B2 from 'backblaze-b2';
import {RateLimiterMemory} from 'rate-limiter-flexible';

type bucketResponseCacheType = {
    data: Array<any>|undefined,
    lastCached: number|undefined,
    ttl: number,
}

const rateLimiter = new RateLimiterMemory({
    points: 5,
    duration: 10,
});

const bucketResponseCache: bucketResponseCacheType = {
    data: undefined,
    lastCached: undefined,
    ttl: 1000 * 60 * 30, // 30 minutes
};

export default async function handler(req: any, res: any) {
    const appKey = process.env.B2_APPLICATION_KEY;
    const appKeyId = process.env.B2_APPLICATION_KEY_ID;
    const bucketId = process.env.B2_BUCKET_ID;

    if (!req.connection.remoteAddress) {
        return res.status(500).json({
            result: 'failure',
            message: 'Unable to resolve client\'s IP address'
        });
    }

    try {
        await rateLimiter.consume(req.address, 1);
    } catch (error) {
        return res.status(429).json({
            result: 'failure',
            message: 'Slow down! Try again after a few seconds.',
        });
    }

    if (!appKey || !appKeyId || !bucketId) {
        return res.status(500).json({
            result: 'failure',
            message: 'Internal Server Error',
        })
    }

    try {
        const timeNow = (new Date()).getTime();
        if (!bucketResponseCache.data || !bucketResponseCache.lastCached || (bucketResponseCache.lastCached + bucketResponseCache.ttl) < timeNow) {
            const b2 = new B2({
                applicationKeyId: appKeyId,
                applicationKey: appKey,
                retry: {
                    retries: 5,
                },
            });
            return new Promise<void>((resolve, reject) => {
                b2.authorize()
                    .then(() => {
                        b2.listFileNames({
                            bucketId: bucketId,
                            startFileName: '',
                            maxFileCount: 255,
                            delimiter: '',
                            prefix: 'wedsite2021/',
                        })
                            .then((axiosRes) => {
                                const returnData = axiosRes.data.files.map((fileObject: { fileName: string; [key: string]: any}) => fileObject.fileName).filter((fileName: string) => !fileName.match(/\.bzEmpty$/));
                                bucketResponseCache.data = returnData;
                                bucketResponseCache.lastCached = timeNow;
                                return res.status(200).json({
                                    result: 'success',
                                    data: returnData,
                                });
                            });
                    })
                    .catch(err => {
                        console.error(err);
                        return res.status(500).json({
                            result: 'failure',
                            message: 'Server was unable to retrieve image list from storage bucket',
                        });
                    })
                    .finally(() => resolve())
            });
        } else {
            return res.status(200).json({
                result: 'success',
                data: bucketResponseCache.data,
            })
        }
    } catch (err) {
        return res.status(500).json({
            result: 'failure',
            message: 'Unknown server error',
        });
    }
}
