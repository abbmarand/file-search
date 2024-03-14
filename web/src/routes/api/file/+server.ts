import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function POST (RequestEvent) {
    const { request } = RequestEvent
    const data = await request.json()
    const id = data.id
    const filedata = await prisma.file.findFirst({ where: { fileid: id } })
    return new Response(JSON.stringify(filedata))
}