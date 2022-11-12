import { NextApiRequest, NextApiResponse } from "next";
import formidable, { Part } from "formidable"
import { minio } from "../../common/minio"
import { logger } from "../../common/logger";
import { PassThrough } from 'node:stream';

const get = async (req: NextApiRequest, res: NextApiResponse) => {
    const buckets = await minio.listBuckets()
    const image = await minio.getObject("family", "remote-team.png")
    console.log(image)

    res.send(image)
}
const post = async (req: NextApiRequest, res: NextApiResponse) => {
    const filter = ({ mimetype }: Part) => {
        return !!mimetype && mimetype.includes("image")
    }
    const uploadStream: any = (file: File) => {
        const pass = new PassThrough();
        // @ts-ignore
        minio.putObject("family", file.newFilename, pass, function (err, etag) {
            // @ts-ignore
            res.status(201).json(file.newFilename)
        });
        return pass;
    };
    const form = formidable({
        multiples: true,
        keepExtensions: true,
        filter: filter,
        fileWriteStreamHandler: uploadStream,
    });

    form.parse(req, async (err, fields, files) => {
        if (err) res.status(400)
        if (!files.file) res.status(400).send("Bad request")
    })
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            await get(req, res)
            break;
        case "POST":
            await post(req, res)
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
}
export default handler
