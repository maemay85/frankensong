import mongoose from "mongoose"
import chalk from "chalk"

const { DATABASE_URL } = process.env

export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch(err => chalk.bgRedBright(console.log(err)))
  chalk.bgGreenBright(console.log("Mongoose Connection Established"))

  const ParticipantSchema = new mongoose.Schema({
    name: String,
    submissionStatus: {
      type: String,
      enum: ['In Queue', 'Pending', 'Completed', 'Opt Out']
    }
  })

  const Participant = mongoose.models.Participant || mongoose.model("Participant", ParticipantSchema)

  return { conn, Participant }
}
