<script>
    import axios from "axios";
    import Dropzone from "$lib/components/svelte-file-dropzone/dist/components/Dropzone.svelte";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import Mode from "$lib/mode.svelte";
    const orgid = "82e2f8eb-b9ef-469c-8678-27211299b6ba";
    let files = {
        accepted: [],
        rejected: [],
    };
    let filedata = [];
    let answer = false;
    async function Upload() {
        const uploadingfiles = filedata;
        filedata = [];
        for (const file of uploadingfiles) {
            const res = await axios.post(`/api/upload`, {
                name: file.name,
                file: file.data,
                orgid: orgid,
            });
            answer = res.data.data;
        }
    }

    const handleFileChange = (event) => {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = (event) => {
                filedata.push({
                    name: file.name,
                    data: event.target.result,
                });
                // Optionally, you can perform actions with the file data here
                console.log("Filename: ", file.name);
            };
            reader.readAsText(file);
        }
    };

    function handleFilesSelect(e) {
        const { acceptedFiles, fileRejections } = e.detail;
        files.accepted = [...files.accepted, ...acceptedFiles];
        files.rejected = [...files.rejected, ...fileRejections];

        for (let file of acceptedFiles) {
            let reader = new FileReader();
            reader.onload = function (event) {
                console.log(`Filename: ${file.name}`);
                filedata.push({
                    name: file.name,
                    data: event.target.result,
                });
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

<div class="grid w-full max-w-sm items-center gap-1.5">
    <Label for="file">File</Label>
    <Input id="file" type="file" on:change={handleFileChange} />
</div>

<Button on:click={Upload}>upload file</Button>
<Dropzone on:drop={handleFilesSelect} />

<Textarea bind:value={query}></Textarea>
<Button on:click={ask}>ask</Button>

<div class="flex flex-col">
    {#each qans as an}
        <div class="my-4">
            <pre>{an.secdata}</pre>

            <a class="" href="/subfile/{an.subfileid}">go to {an.subfileid}</a>
        </div>
    {/each}
</div>
