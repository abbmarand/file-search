import { PrismaClient } from '@prisma/client'
import axios from 'axios'
const client = new PrismaClient()
export async function POST (RequestEvent) {
    const { request } = RequestEvent
    const data = await request.json()
    const username = data.name

    return new Response(username)
}