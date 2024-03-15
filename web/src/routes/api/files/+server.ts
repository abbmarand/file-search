import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function GET () {
    const files = await prisma.file.findMany()
    console.log(files)
    return new Response("hello from the API")
}