import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'
import axios from 'axios'
const prisma = new PrismaClient()
const app = express()
let totalrequests: number = 0
app.use(cors())
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

app.post(`/upload`, async (req, res) => {
    try {
        const reqbody = req.body
        const filedata = reqbody.data
        const summarization = await axios.post("http://127.0.0.1:5000/sum", { "f": filedata })
        console.log(summarization.data)
        const savedfile = await prisma.files.create({
            data: {
                data: filedata,
                summary: summarization.data.text,

            }
        })
        res.send()
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }

})

app.post(`/qa`, async (req, res) => {
    try {
        const reqbody = req.body
        const fileid = reqbody.id
        const question = reqbody.q
        const context = await prisma.files.findFirst({ where: { fileid: fileid } })
        const answer = await axios.post(`http://127.0.0.1:5000/qa`, { "q": question, "c": context?.data })
        res.send({ "answer": answer.data })
    } catch (e) {
        res.status(500).send(e)
    }
})

app.post(`/sqa`, async (req, res) => {
    try {
        const reqbody = req.body
        const question = reqbody.q
        const c = reqbody.c

        const answer = await axios.post(`http://127.0.0.1:5000/qa`, { "q": question, "c": c })
        res.send({ "answer": answer.data })
    } catch (e) {
        res.status(500).send(e)
    }
})