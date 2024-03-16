<script>
    import axios from "axios";
    import Dropzone from "$lib/components/svelte-file-dropzone/dist/components/Dropzone.svelte";
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    import { Label } from "$lib/components/ui/label";
    import DataTable from "./data-table.svelte";

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
            try {
                const res = await axios.post(`/api/upload`, {
                    name: file.name,
                    file: file.data,
                    orgid: orgid,
                });
                answer = res.data.data;
            } catch (error) {}
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
<div class="container mx-auto py-10">
    <DataTable />
</div>
