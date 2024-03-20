import { PrismaClient } from '@prisma/client'
import pgvector from 'pgvector'
import axios, { type AxiosResponse } from 'axios'
import { uuid } from 'uuidv4'
const prisma = new PrismaClient()
const retry = async (fn: { (): Promise<void>; (): any }, maxAttempts: number, delay: number) => {
    try {
        console.log("retrying")
        return await fn()
    } catch (error) {
        if (maxAttempts <= 0) {
            throw error // Retry limit reached, throw error
        }
        console.log(`Request failed. Retrying in ${delay / 1000} seconds...`)
        await new Promise(resolve => setTimeout(resolve, delay)) // Wait for the specified delay
        return await retry(fn, maxAttempts - 1, delay) // Retry the operation
    }
}

export async function POST (RequestEvent: { request: any }) {
    const { request } = RequestEvent
    const data = await request.json()

    const filedata = data.file
    const name = data.name
    const orgid = data.orgid
    const starttime = Date.now() / 1000
    let summarization: AxiosResponse<any, any>
    const testfile = await prisma.file.findFirst({ where: { filename: name } })
    if (testfile) {
        console.log("file exists")
        return new Response(JSON.stringify(testfile))
    }
    const origfile = await prisma.file.create({
        data: {
            filename: name,
            data: filedata,
            date: Date.now() / 1000,
            time: 0,
            totalsubfiles: 0,
            state: "Processing"
        }
    })
    try {
        summarization = await axios.post("http://127.0.0.1:5000/split", { "f": filedata })
        console.log(summarization)
    } catch (error) {
        const file = await prisma.file.update({
            where: {
                fileid: origfile.fileid
            },
            data: {
                state: "Failed"
            }
        })
    }

    const file = await prisma.file.update({
        where: {
            fileid: origfile.fileid
        },
        data: {
            filename: name,
            data: filedata,
            date: Date.now() / 1000,
            time: summarization.data.time,
            totalsubfiles: 0,
            state: "Processing"
        }
    })


    const maxAttempts = 3 // Maximum number of retry attempts
    const delay = 1000 // Delay between retry attempts in milliseconds
    const promises = summarization.data.result.map(async (sumtext: any) => {
        if (sumtext.length > 20) {
            const makeRequest = async () => {
                try {
                    const embedding = await axios.post("http://127.0.0.1:5000/sum", { "f": sumtext })
                    const convertedEmbedding = pgvector.toSql(embedding.data.result)
                    const id = uuid()
                    await prisma.$executeRaw`INSERT INTO subfile (subfileid, ownerfileid, secdata, embedding) VALUES ((${id}), ${file.fileid}, ${sumtext}, ${convertedEmbedding}::vector)`
                } catch (error) {
                    const endtime = Date.now() / 1000
                    const updatedfile = await prisma.file.update({
                        where: {
                            fileid: file.fileid
                        },
                        data: {
                            time: endtime - starttime,
                            totalsubfiles: summarization.data.result.length,
                            state: "Failed"
                        }
                    })
                }

            }
            try {
                await retry(makeRequest, maxAttempts, delay)
            } catch (error) {
                const endtime = Date.now() / 1000
                const updatedfile = await prisma.file.update({
                    where: {
                        fileid: file.fileid
                    },
                    data: {
                        time: endtime - starttime,
                        totalsubfiles: summarization.data.result.length,
                        state: "Failed"
                    }
                })
            }
        }



    })

    await Promise.all(promises)
    const endtime = Date.now() / 1000

    const updatedfile = await prisma.file.update({
        where: {
            fileid: file.fileid
        },
        data: {
            time: endtime - starttime,
            totalsubfiles: summarization.data.result.length,
            state: "Created"
        }
    })

    return new Response(JSON.stringify(updatedfile))
}

/*/
{
  orgId: '82e2f8eb-b9ef-469c-8678-27211299b6ba',
  orgName: 'org',
  orgUrl: 'https://rustalytics.com',
  orgWeb: 'https://rustalytics.com'
}
/*/