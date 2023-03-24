import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@/utils/connection";
import { ResponseFuncs } from "@/utils/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  const catcher = (error: Error) => res.status(400).json({ error })

  const handleCase: ResponseFuncs = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Participant } = await connect()
      res.json(await Participant.find({}).catch(catcher))
    },

    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Participant } = await connect()
      res.json(await Participant.create(req.body).catch(catcher))
    },
  }

  const response = handleCase[method]
  if(response) response(req,res)
  else res.status(400).json({ error: "No Response for This Request"})
}

export default handler
