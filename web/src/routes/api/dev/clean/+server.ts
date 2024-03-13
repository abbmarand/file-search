import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function GET() {
    await prisma.subfile.deleteMany()
    await prisma.file.deleteMany()
    return new Response("cleaned")
}