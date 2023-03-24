import { useRouter } from "next/router";
import { FormEvent, FormEventHandler, useRef } from "react";
import { Participant } from "@/utils/types";

// define props
interface CreateProps {
  url: string
}

// Define component
function Create(props: CreateProps) {
  // get the next route
  const router = useRouter()

  // only one input, so uncontrolled form will do
  const name = useRef<HTMLInputElement>(null)

  // Function to create new todo
  const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault()

    //construct the new todo
    let participant: Participant = { name: "", submissionStatus: "In Queue" }
    if (null !== name.current) {
      participant = { name: name.current.value, submissionStatus: "In Queue" }
    }

    // make api request
    await fetch(props.url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(participant),
    })

    // return to main page
    router.push("/")
  }

  return (
    <div>
      <h1>Add a participant</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={name}></input>
        <input type="submit" value="create participant"></input>
      </form>
    </div>
  )
}

//export getStaticProps
export async function getStaticProps(context: any) {
  return {
    props: {
      url: process.env.API_URL,
    },
  }
}

//export component
export default Create
