import assert from "http-assert";
import { NextApiRequest, NextApiResponse } from "next";
import { Tree } from "../../../schemas/Tree";

const getTree = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    assert(id, 400)
    assert(!Array.isArray(id), 400)
    const tree = await Tree.findByPk(id)
    res.json(tree)
}

const putTree = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const { name, cover, note } = req.body
    assert(name, 400)
    assert(cover, 400)
    assert(note, 400)
    assert(id, 400)
    assert(!Array.isArray(id), 400)
    const tree = await Tree.findByPk(id)
    assert(tree, 400, "tree not found")
    tree.name = name
    tree.cover = cover
    tree.note = note
    const db = await tree.save()
    res.json(db)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            await getTree(req, res)
            break;
        case "PUT":
            await putTree(req, res)
            break;
        default:
            res.setHeader("Allow", ["GET", "PUT"])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export default handler