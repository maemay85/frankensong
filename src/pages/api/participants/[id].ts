import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '@/utils/connection';
import { ResponseFuncs } from "@/utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  const catcher = (error: Error) => res.status(400).json({ error })

  const id: string = req.query.id as string

  // Responses for participants/:id
  const handleCase: ResponseFuncs = {

    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Participant } = await connect()
      res.json(await Participant.findById(id).catch(catcher))
    },

    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Participant } = await connect()
      res.json(await Participant.findByIdAndUpdate(id, req.body, { new: true }).catch(catcher))
    },

    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Participant } = await connect()
      res.json(await Participant.findByIdAndRemove(id).catch(catcher))
    },
  }

  const response = handleCase[method]
  if (response) response(req, res)
  else res.status(400).json({ error: "No Response for this Request"})
}

export default handler
