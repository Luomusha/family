import assert from "http-assert";
import { NextApiRequest, NextApiResponse } from "next";
import {Person} from "../../../schemas/Person";

const getPersons = async (req: NextApiRequest, res: NextApiResponse) => {
    const persons = await Person.findAll()
    res.json(persons)
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            await getPersons(req, res)
            break;
        default:
            res.setHeader("Allow", ["GET"])
            res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}

export default handler
