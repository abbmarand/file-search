import { PrismaClient } from '@prisma/client'
import pgvector from 'pgvector'
import axios from 'axios'
import { uuid } from 'uuidv4'
const prisma = new PrismaClient()
const retry = async (fn: { (): Promise<void>; (): any }, maxAttempts: number, delay: number) => {
    try {
        return await fn();
    } catch (error) {
        if (maxAttempts <= 0) {
            throw error; // Retry limit reached, throw error
        }
        console.log(`Request failed. Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the specified delay
        return await retry(fn, maxAttempts - 1, delay); // Retry the operation
    }
};

export async function POST(RequestEvent: { request: any }) {
    const { request } = RequestEvent;
    const data = await request.json();

    const filedata = data.file;
    const orgid = data.orgid;
    const summarization = await axios.post("http://127.0.0.1:5000/split", { "f": filedata });
    const file = await prisma.file.create({
        data: {
            data: filedata,
            date: Date.now() / 1000,
            time: summarization.data.time,
        }
    });

    const starttime = Date.now() / 1000;
    const maxAttempts = 3; // Maximum number of retry attempts
    const delay = 1000; // Delay between retry attempts in milliseconds

    const promises = summarization.data.result.map(async (sumtext: any) => {
        const makeRequest = async () => {
            const embedding = await axios.post("http://127.0.0.1:5000/sum", { "f": sumtext });
            const convertedEmbedding = pgvector.toSql(embedding.data.result);
            const id = uuid();
            await prisma.$executeRaw`INSERT INTO subfile (subfileid, ownerfileid, secdata, embedding) VALUES ((${id}), ${file.fileid}, ${sumtext}, ${convertedEmbedding}::vector)`;
        };

        try {
            await retry(makeRequest, maxAttempts, delay);
        } catch (error) {
            console.error("Failed to process sumtext:", error);
            // You can handle the failure here, such as logging, retrying again, or ignoring
        }
    });

    await Promise.all(promises);
    const endtime = Date.now() / 1000;

    const updatedfile = await prisma.file.update({
        where: {
            fileid: file.fileid
        },
        data: {
            time: endtime - starttime,
        }
    });

    return new Response(JSON.stringify(updatedfile));
}

/*/
{
  orgId: '82e2f8eb-b9ef-469c-8678-27211299b6ba',
  orgName: 'org',
  orgUrl: 'https://rustalytics.com',
  orgWeb: 'https://rustalytics.com'
}
/*/