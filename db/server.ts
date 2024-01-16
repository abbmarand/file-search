import { PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()
let totalrequests: number = 0
app.use(express.json())
app.listen(4000, () => {
    console.log(`server running on port ${4000}`)
})

app.use((req, res, next) => {
    totalrequests++
    console.log(`${new Date()} (${totalrequests}) (${req.url})`)
    next()
})