import assert from "http-assert";
import { NextApiRequest, NextApiResponse } from "next";
import { Tree } from "../../../schemas/Tree";

const getTrees = async (req: NextApiRequest, res: NextApiResponse) => {
    const members = await Tree.findAll()
    res.json(members)
}

const postTrees = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, cover, note } = req.body
    assert(name, 400, "name is required.")
    assert(cover, 400, "cover is required.")
    assert(note, 400, "note is required.")
    const db = await Tree.create({ name, cover, note })
    res.json(db)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            await getTrees(req, res)
            break;
        case "POST":
            await postTrees(req, res)
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export default handler
