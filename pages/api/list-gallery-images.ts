import B2 from 'backblaze-b2';
import {RateLimiterMemory} from 'rate-limiter-flexible';
import Cors from '../../components/Cors';
import {NextApiRequest, NextApiResponse} from 'next';

type bucketResponseCacheType = {
    data?: Array<any>,
    lastCached?: number,
    ttl: number,
}

const rateLimiter = new RateLimiterMemory({
    points: 20,
    duration: 60,
});

const bucketResponseCache: bucketResponseCacheType = {
    data: undefined,
    lastCached: undefined,
    ttl: 1000 * 60 * 30, // 30 minutes
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await Cors(req, res);

    if (req.method !== 'GET') {
        return res.status(405).json({
            result: 'failure',
            message: 'Method not allowed'
        });
    }

    const appKey = process.env.B2_APPLICATION_KEY;
    const appKeyId = process.env.B2_APPLICATION_KEY_ID;
    const bucketId = process.env.B2_BUCKET_ID;

    type getHeaderValueFn = string|undefined;
    const getXForwardedForHeader = (): getHeaderValueFn => {
        if (typeof req.headers['x-forwarded-for'] === 'string' || req.headers['x-forwarded-for'] instanceof String) {
            return req.headers['x-forwarded-for'].split(/, ?/)[0] || undefined;
        } else if (Array.isArray(req.headers['x-forwarded-for'])) {
            return req.headers['x-forwarded-for'][0] || undefined;
        }
        return undefined;
    }
    const getCloudflareHeader = (): getHeaderValueFn => {
        if (typeof req.headers['cf-connecting-ip'] === 'string' || req.headers['cf-connecting-ip'] instanceof String) {
            return <string | undefined> req.headers['cf-connecting-ip'];
        } else if (typeof req.headers['true-client-ip'] === 'string' || req.headers['true-client-ip'] instanceof String) {
            return <string | undefined> req.headers['true-client-ip'];
        }
    }

    const clientIp: string|undefined = getCloudflareHeader() || getXForwardedForHeader() || req.connection.remoteAddress;

    if (!clientIp) {
        return res.status(500).json({
            result: 'failure',
            message: 'Unable to resolve client\'s IP address'
        });
    }

    try {
        await rateLimiter.consume(clientIp, 1);
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
            return new Promise<void>((resolve) => {
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
