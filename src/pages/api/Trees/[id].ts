import assert from "http-assert";
import { NextApiRequest, NextApiResponse } from "next";
import { Tree } from "../../../schemas/Tree";

const getTree = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    assert(id, 400)
    assert(!Array.isArray(id), 400)
    const member = await Tree.findByPk(id)
    res.json(member)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            await getTree(req, res)
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export default handler