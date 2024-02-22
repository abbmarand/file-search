import { PrismaClient } from '@prisma/client'
import axios from 'axios'
const client = new PrismaClient()
export async function POST (RequestEvent) {
    const { request } = RequestEvent
    const data = await request.json()

    const filedata = data.file
    const summarization = await axios.post("http://127.0.0.1:5000/split", { "f": filedata })
    console.log(summarization.data.result)
    for (const text of summarization.data.result) {
        const embedding = await axios.post("http://127.0.0.1:5000/sum", { "f": text })
        console.log(embedding.data)
    }
    return new Response(summarization.data)
}