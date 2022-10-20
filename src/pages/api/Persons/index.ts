import assert from "http-assert";
import { NextApiRequest, NextApiResponse } from "next";
import { Person } from "../../../schemas/Person";

const getPersons = async (req: NextApiRequest, res: NextApiResponse) => {
    const persons = await Person.findAll()
    res.json(persons)
}

const postPersons = async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, gender, birthday } = req.body
    assert(name, 400)
    assert(gender, 400)
    assert(birthday, 400)
    const db = await Person.create({ name, gender, birthday })
    res.json(db)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            await getPersons(req, res)
            break;
        case "POST":
            await postPersons(req, res)
            break;
        default:
            res.setHeader("Allow", ["GET", "POST"])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export default handler
