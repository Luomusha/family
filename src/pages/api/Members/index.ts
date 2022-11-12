import assert from "http-assert";
import { NextApiRequest, NextApiResponse } from "next";
import { Member } from "../../../schemas/Member";

const getMembers = async (req: NextApiRequest, res: NextApiResponse) => {
    const { tid } = req.query
    const members = await Member.findAll({ where: { tid } })
    res.json(members)
}

const postMembers = async (req: NextApiRequest, res: NextApiResponse) => {
    const { tid, name, gender, birthday, avatar } = req.body
    assert(tid, 400)
    assert(name, 400)
    assert(gender, 400)
    assert(birthday, 400)
    assert(avatar, 400)
    const db = await Member.create({ tid, name, gender, birthday, avatar })
    res.json(db)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            await getMembers(req, res)
            break;
        case "POST":
            await postMembers(req, res)
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export default handler
