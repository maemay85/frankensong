import { Participant } from "@/utils/types";
import { useRouter } from "next/router";
import { useState, ChangeEvent } from "react";

interface ShowProps {
  participant: Participant
  url: string
}

function Show(props: ShowProps) {

  const router = useRouter()
  const [participant, setParticipant] = useState<Participant>(props.participant)
  const [status, setStatus] = useState(props.participant.submissionStatus)

  const handleSubmissionStatusUpdate = async (event: ChangeEvent<HTMLSelectElement>) => {
    const updatedParticipant: Participant = {...participant, submissionStatus: event.target.value}

    await fetch(props.url + '/' + participant._id, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedParticipant)
    })
    setParticipant(updatedParticipant)
  }

  const handleDelete = async () => {
    await fetch(props.url + '/' + participant._id, {
      method: 'delete',
      headers: {
        "Content-Type": "application/json"
      }
    })
    router.push('/')
  }

  return (
    <div>
      <h1>{participant.name}</h1>
      <label>Submission Status: {participant.submissionStatus}
        <select value={status} onChange={handleSubmissionStatusUpdate}>
          <option value="In Queue">In Queue</option>
          <option value="Submission Pending">Submission Pending</option>
          <option value="Submission completed">Submission Completed</option>
          <option value="Opted Out">Opted Out</option>

        </select>
      </label>

      <button onClick={handleDelete}>Delete</button>
      <button onClick={()=>{router.push('/')}}>Back</button>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const res = await fetch(process.env.API_URL + '/' + context.query.id)
  const participant = await res.json()

  return { props: { participant, url: process.env.API_URL } }
}

export default Show


