import { PrismaClient } from '@prisma/client'
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import axios from 'axios'
const prisma = new PrismaClient()
const app = express()
let totalrequests: number = 0
app.use(cors())
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use((req, res, next) => {
    totalrequests++
    console.log(`${new Date()} (${totalrequests}) (${req.url})`)
    next()
})

app.listen(4000, () => {
    console.log(`server running on port ${4000}`)
})
app.get(`/`, (req, res) => {
    res.send()
})

app.post(`/upload`, async (req, res) => {
    try {
        const reqbody = req.body
        const filedata = reqbody.file
        const summarization = await axios.post("http://127.0.0.1:5000/split", { "f": filedata })
        console.log(summarization.data.result)
        for (const text of summarization.data.result) {
            const embedding = await axios.post("http://127.0.0.1:5000/sum", { "f": text })
            console.log(embedding.data)
        }
        res.send(summarization.data)
        /*/
        const savedfile = await prisma.files.create({
            data: {
                data: filedata,
                summary: summarization.data.text,

            }
        })
        /*/
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }

})
