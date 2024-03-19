import OpenAI from "openai"
import 'dotenv/config'
const openaikey = process.env.OPENAI_API_KEY
const openai = new OpenAI({ apiKey: openaikey })

export async function POST (RequestEvent) {
    const { request } = RequestEvent
    const data = await request.json()

    const question = data.text
    const thread = await openai.beta.threads.create()
    let threadResponse: String = '' // Variable to store the thread response

    const message = await openai.beta.threads.messages.create(
        thread.id,
        {
            role: "user",
            content: question
        }
    )

    const streamPromise = new Promise((resolve, reject) => {
        openai.beta.threads.runs.createAndStream(thread.id, {
            assistant_id: "asst_9KLr1yp1RgNnflkvxnB00XRC"
        })
            .on("textDone", (content) => {
                resolve(content.value)
            })
            .on("error", (error) => {
                reject(error)
            })
    })

    try {
        // Wait for the thread response
        threadResponse = await streamPromise
    } catch (error) {
        console.error("Error:", error)
        // Handle error response if necessary
    }

    // Return response with the thread response
    return new Response(threadResponse, {
        headers: { 'Content-Type': 'text/plain' }
    })
}
