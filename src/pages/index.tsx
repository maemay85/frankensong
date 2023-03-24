import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useState } from 'react'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

const [list, setList] = useState([])

const updateList = () => {

}

  return (
    <>
      <Head>
        <title>List Randomizer</title>
        <meta name="description" content="List randomizer app built using Create Next App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <div>
          <h1>List Randomizer</h1>
        </div>
      </main>
    </>
  )
}
