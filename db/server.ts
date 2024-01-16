import { PrismaClient } from '@prisma/client'
import express from 'express'
import axios from 'axios'
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

app.get(`/`, (req, res) => {
    res.send()
})

app.post(`/upload`, (req, res) => {
    try {
        console.log(`${JSON.stringify(req)}`)
        res.send()
    } catch (e) {
        res.status(500).send()
    }

})  