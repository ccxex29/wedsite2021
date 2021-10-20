import NextCors from 'nextjs-cors';
import {NextApiRequest, NextApiResponse} from 'next';

async function runMiddleware(req: NextApiRequest, res: NextApiResponse) {
    return await NextCors(req, res, {
        methods: ['GET', 'OPTION'],
        origin: ['localhost:3000', '*.femmund.com'],
        optionsSuccessStatus: 200,
    });
}

const middleware = function (req: NextApiRequest, res: NextApiResponse) {
    return runMiddleware(req, res);
};

export default middleware;
