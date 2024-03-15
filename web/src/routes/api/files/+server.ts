import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function GET () {
    const files = await prisma.file.findMany({ select: { fileid: true, filename: true, time: true, date: true } })


    return new Response(JSON.stringify(files))
}