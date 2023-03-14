import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function Home() {
  const [messageInput, setMessageInput] = useState('')
  const [result, setResult] = useState()
  const [prompt, setPrompt] = useState('')
  const [divs, setDivs] = useState([])
  //使用解构给数组添加新的元素
  useEffect(() => {
    setDivs([
      ...divs,

      <div className="result" key={divs.length}>
        {result}
      </div>,
    ])
  }, [result])
  async function onSubmit(event) {
    event.preventDefault()
    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer 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',
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: messageInput,
          max_tokens: 512,
          temperature: 0.5,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
        }),
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }
      console.log(data)
      setResult(data.choices[0].text)
      console.log('result=', result)
      setMessageInput('')
      setPrompt(messageInput)
      setDivs([
        ...divs,
        <div className="messageInput" key={divs.length + 'promp'}>
          {messageInput}
        </div>,
      ])
      // setDivs([
      //   ...divs,
      //   <div className="result" key={divs.length}>
      //     {data.choices[0].text}
      //   </div>,
      // ])
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <div className="container">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8"></meta>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <main>
        {/* <img src="/dog.png" /> */}
        {/* <h3>ycui chatgpt in Chinese</h3> */}
        <div>
          <input
            type="text"
            name="animal"
            placeholder="say something"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={(e) => {
              onSubmit(e)
            }}
          >
            send message
          </button>
        </div>
        {divs}
      </main>
    </div>
  )
}
