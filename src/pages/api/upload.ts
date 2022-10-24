import { NextApiRequest, NextApiResponse } from "next";
import { minio } from "../../common/minio"

const getUpload = async (req: NextApiRequest, res: NextApiResponse) => {
    const buckets = await minio.listBuckets()
    const image = await minio.getObject("family", "remote-team.png")
    console.log(image)

    res.send(image)
}
const postUpload = async (req: NextApiRequest, res: NextApiResponse) => {
    const blob = req.body
    const result = await minio.putObject("family", "hi.png", blob)
    console.log(result);
    res.json(result)
}


async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            await getUpload(req, res)
            break;
        case "POST":
            await postUpload(req, res)
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export default handler
