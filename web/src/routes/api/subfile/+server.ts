import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function POST (RequestEvent) {
    const { request } = RequestEvent
    const data = await request.json()
    const id = data.id
    const subfiledata = await prisma.subfile.findFirst({ where: { subfileid: id } })
    const filedata = await prisma.file.findFirst({ where: { fileid: subfiledata.ownerfileid } })
    const resdata = JSON.stringify({ subfiledata, filedata })
    return new Response(`${resdata}`)
}