import { NextApiRequest, NextApiResponse } from "next";
import { minio } from "../../common/minio"

const getUpload = async (req: NextApiRequest, res: NextApiResponse) => {
    minio.
}
const postUpload = async (req: NextApiRequest, res: NextApiResponse) => {
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
