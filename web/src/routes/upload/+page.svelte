<script>
    import axios from "axios";
    import Dropzone from "$lib/components/svelte-file-dropzone/dist/components/Dropzone.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import DataTable from "./data-table.svelte";
    import { Progress } from "$lib/components/ui/progress";
    import { Skeleton } from "$lib/components/ui/skeleton";
    import { onMount } from "svelte";
    const orgid = "82e2f8eb-b9ef-469c-8678-27211299b6ba";
    let files = {
        accepted: [],
        rejected: [],
    };
    let filedata = [];
    let answer = false;
    let completed = 0;
    let failed = 0;
    let loaded = false;
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
                answer = res.data.data;
            } catch (error) {
                failed++;
            }
        }
        filedata = [];
        completed = 0;
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
                filedata.push({
                    name: file.name,
                    data: event.target.result,
                });
                filedata = filedata;
            };
            reader.readAsText(file);
        }
    }
    let isDataTableReady = false;

    // Simulate a delay to represent DataTable rendering
    onMount(() => {
        setTimeout(() => {
            isDataTableReady = true;
        }, 2000); // Adjust the timeout as needed
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
    {#if !isDataTableReady}
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
    <div class="datatable-container" class:ready={isDataTableReady}>
        <DataTable />
    </div>
</div>
