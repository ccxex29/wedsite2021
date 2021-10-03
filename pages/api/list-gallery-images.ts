import B2 from 'backblaze-b2';

export default function handler(req: any, res: any) {
    const appKey = process.env.B2_APPLICATION_KEY;
    const appKeyId = process.env.B2_APPLICATION_KEY_ID;
    const bucketId = process.env.B2_BUCKET_ID;

    if (!appKey || !appKeyId || !bucketId) {
        return res.status(500).json({
            result: 'failure',
            message: 'Internal Server Error',
        })
    }

    try {
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
                        message: 'Internal Server Error',
                    });
                })
                .finally(() => resolve())
        });
    } catch (err) {
        return res.status(500).json({
            result: 'failure',
            message: 'Internal Server Error',
        });
    }
}
