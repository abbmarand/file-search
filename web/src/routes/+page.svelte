<script>
    import axios from "axios";
    import Dropzone from "svelte-file-dropzone/Dropzone.svelte";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Button } from "$lib/components/ui/button";
    import { text } from "@sveltejs/kit";
    const orgid = "82e2f8eb-b9ef-469c-8678-27211299b6ba";
    let files = {
        accepted: [],
        rejected: [],
    };
    let filedata = [];
    let answer = false;
    async function Upload() {
        for (const file of filedata) {
            const res = await axios.post(`/api/upload`, {
                file: file,
                orgid: orgid,
            });
            answer = res.data.data;
        }
    }

    function handleFilesSelect(e) {
        const { acceptedFiles, fileRejections } = e.detail;
        files.accepted = [...files.accepted, ...acceptedFiles];
        files.rejected = [...files.rejected, ...fileRejections];

        for (let file of acceptedFiles) {
            let reader = new FileReader();
            reader.onload = function (event) {
                console.log(`File content: ${event.target.result}`);
                filedata.push(event.target.result);
            };
            reader.readAsText(file);
        }
    }
    let query = "";
    let qans = "";
    async function ask() {
        const res = await axios.post(`/api/search`, {
            text: query,
        });
        qans = res.data;
        query = query;
    }
</script>

<label for="avatar">Upload a picture:</label>
<input
    accept="image/png, image/jpeg"
    bind:files
    id="avatar"
    name="avatar"
    type="file"
/>
<label for="many">Upload multiple files of any type:</label>
<input bind:files id="many" multiple type="file" />
<Button on:click={Upload}>upload file</Button>
<Dropzone on:drop={handleFilesSelect} />

<Textarea bind:value={query}></Textarea>
<Button on:click={ask}>ask</Button>

<div class="flex flex-col">
    {#each qans as an}
        <div class="my-4">
            {an.secdata}
        </div>
    {/each}
</div>
