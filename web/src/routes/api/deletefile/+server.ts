import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function POST (RequestEvent) {
    const { request } = RequestEvent
    const data = await request.json()
    const id = data.id
    await prisma.subfile.deleteMany({ where: { ownerfileid: id } })
    await prisma.file.deleteMany({ where: { fileid: id } })
    return new Response("deleted")
} 