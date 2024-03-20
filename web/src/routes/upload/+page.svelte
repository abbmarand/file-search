<script>
    import axios from "axios";
    import Dropzone from "$lib/components/svelte-file-dropzone/dist/components/Dropzone.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import DataTable from "./data-table.svelte";
    import { Progress } from "$lib/components/ui/progress";
    import { Skeleton } from "$lib/components/ui/skeleton";
    import { onMount } from "svelte";
    import mammoth from "mammoth";
    const orgid = "82e2f8eb-b9ef-469c-8678-27211299b6ba";
    let files = {
        accepted: [],
        rejected: [],
    };
    let filedata = [];
    let completed = 0;
    let failed = 0;
    let additemchildfunction;
    async function Upload() {
        const uploadingfiles = filedata;

        for (const file of uploadingfiles) {
            try {
                const res = await axios.post(`/api/upload`, {
                    name: file.name,
                    file: file.data,
                    orgid: orgid,
                });
                completed++;

                if (res && res.data && !res.data.exists && res.data.data) {
                    additemchildfunction(res.data.data);
                }
            } catch (error) {
                console.log(error);
                failed++;
            }
        }
        filedata = [];
        completed = 0;
    }

    function handleFileChange(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.name.endsWith(".docx")) {
                handleDocxFile(file);
            } else {
                handleTxtFile(file);
            }
        }
    }

    function handleFilesSelect(e) {
        const { acceptedFiles, fileRejections } = e.detail;
        files.accepted = [...files.accepted, ...acceptedFiles];
        files.rejected = [...files.rejected, ...fileRejections];

        for (let file of acceptedFiles) {
            if (file.name.endsWith(".docx")) {
                handleDocxFile(file);
            } else {
                handleTxtFile(file);
            }
        }
    }

    function handleDocxFile(file) {
        const reader = new FileReader();
        reader.onload = async (event) => {
            const result = await mammoth.extractRawText({
                arrayBuffer: event.target.result,
            });
            filedata.push({
                name: file.name,
                data: result.value,
            });
        };
        reader.readAsArrayBuffer(file);
    }

    function handleTxtFile(file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            filedata.push({
                name: file.name,
                data: event.target.result,
            });
        };
        reader.readAsText(file);
    }

    let isDataTableReady = "hidden";

    onMount(() => {
        setTimeout(() => {
            isDataTableReady = "";
        }, 1500);
    });
</script>

<div class="container mx-auto py-10">
    <Dropzone on:drop={handleFilesSelect} />
    <div class="flex flex-row justify-center mt-4">
        <Input
            class="hover:bg-muted/50 "
            id="file"
            type="file"
            on:change={handleFileChange}
        />
        <Button on:click={Upload}>upload file</Button>
    </div>
</div>
<div class="container">
    <Progress value={(completed / filedata.length) * 100} />
</div>
<div class="flex flex-row justify-around">
    <p>files left: {filedata.length - completed}</p>
    <p>files processed: {completed}</p>
    <p>files failed: {failed}</p>
</div>
<div class="container mx-auto py-10">
    {#if isDataTableReady}
        <div class="flex flex-col gap-4">
            <Skeleton class="h-14 w-full rounded-full" />
            <Skeleton class="h-14 w-full rounded-full" />
            <Skeleton class="h-14 w-full rounded-full" />
            <Skeleton class="h-14 w-full rounded-full" />
            <Skeleton class="h-14 w-full rounded-full" />
            <Skeleton class="h-14 w-full rounded-full" />
            <Skeleton class="h-14 w-full rounded-full" />
            <Skeleton class="h-14 w-full rounded-full" />
        </div>
    {/if}
    <div class="datatable-container {isDataTableReady}">
        <DataTable bind:addItem={additemchildfunction} />
    </div>
</div>
