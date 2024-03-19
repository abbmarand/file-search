import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function GET () {
    const result = await prisma.file.aggregate({
        _sum: {
            time: true // assuming `time` is the name of the column you want to sum
        }
    })
    return new Response(result._sum.time)
}