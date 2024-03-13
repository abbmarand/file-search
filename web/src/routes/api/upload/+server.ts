import { PrismaClient } from '@prisma/client'
import axios from 'axios'
const prisma = new PrismaClient()
export async function POST (RequestEvent) {
    const { request } = RequestEvent
    const data = await request.json()
    const filename = data.name
    const orgid = data.org
    const filedata = data.file
    const summarization = await axios.post("http://127.0.0.1:5000/split", { "f": filedata })
    const newfile = await prisma.file.create({
        data: {
            filename: filename,
            data: filedata,
            orgId: "orgid",
        }
    })
    for (const text of summarization.data.result) {
        const embeddingres = await axios.post("http://127.0.0.1:5000/sum", { "f": text })
        await prisma.subfile.create({
            data: {
                ownerFileId: newfile.fileId,
                ownerOrg: newfile.orgId,
                text: text,
                embedding: embeddingres.data.result
            }
        })
    }
    return new Response(summarization.data)
}