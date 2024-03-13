import { PrismaClient } from '@prisma/client'
import pgvector from 'pgvector'
import axios from 'axios'
const prisma = new PrismaClient()
export async function POST (RequestEvent) {
  const { request } = RequestEvent
  const data = await request.json()

  const filedata = data.text
  const embedding = await axios.post("http://127.0.0.1:5000/sum", { "f": filedata })
  const convertedEmbedding = pgvector.toSql(embedding.data.result)
  const limit = 2
  let result = await prisma.$executeRaw`SELECT * FROM subfile ORDER BY embedding <-> ${convertedEmbedding}::vector LIMIT ${limit};`
  for (const sub of result) {
    console.log(sub)
  }
  //await prisma.$queryRaw`SELECT id, embedding::text FROM tv ORDER BY embedding <-> ${embedding}::vector LIMIT ${limit}`
  console.log(result)
  return new Response(`${result}`)
}
/*/
{
  orgId: '82e2f8eb-b9ef-469c-8678-27211299b6ba',
  orgName: 'org',
  orgUrl: 'https://rustalytics.com',
  orgWeb: 'https://rustalytics.com'
}
/*/