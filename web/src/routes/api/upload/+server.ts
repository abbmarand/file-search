import { PrismaClient } from '@prisma/client'
import pgvector from 'pgvector'
import axios from 'axios'
import { uuid } from 'uuidv4'
const prisma = new PrismaClient()
export async function POST(RequestEvent) {
    const { request } = RequestEvent
    const data = await request.json()

    const filedata = data.file
    const orgid = data.orgid
    console.log(filedata)
    const summarization = await axios.post("http://127.0.0.1:5000/split", { "f": filedata })
    console.log(summarization.data.result)
    const file = await prisma.file.create({
        data: {
            data: filedata,

        }
    })
    //orgId: orgid,
    console.log(file)
    for (const sumtext of summarization.data.result) {
        const embedding = await axios.post("http://127.0.0.1:5000/sum", { "f": sumtext })
        const convertedEmbedding = pgvector.toSql(embedding.data.result)
        const id = uuid()
        await prisma.$executeRaw`INSERT INTO subfile (subfileid, ownerfileid, secdata, embedding) VALUES ((${id}), ${file.fileid}, ${sumtext}, ${convertedEmbedding}::vector)`
    }
    return new Response(summarization.data)
}
/*/
{
  orgId: '82e2f8eb-b9ef-469c-8678-27211299b6ba',
  orgName: 'org',
  orgUrl: 'https://rustalytics.com',
  orgWeb: 'https://rustalytics.com'
}
/*/