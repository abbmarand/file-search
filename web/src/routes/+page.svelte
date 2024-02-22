<script>
    import axios from "axios";
    import Dropzone from "svelte-file-dropzone/Dropzone.svelte";

    let files = {
        accepted: [],
        rejected: [],
    };
    let filedata;
    let answer = false;
    async function Upload() {
        const res = await axios.post(`/api/upload`, {
            file: filedata,
        });
        answer = res.data.data;
    }

    function handleFilesSelect(e) {
        const { acceptedFiles, fileRejections } = e.detail;
        files.accepted = [...files.accepted, ...acceptedFiles];
        files.rejected = [...files.rejected, ...fileRejections];

        for (let file of acceptedFiles) {
            let reader = new FileReader();
            reader.onload = function (event) {
                console.log(`File content: ${event.target.result}`);
                filedata = event.target.result;
            };
            reader.readAsText(file);
        }
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
<button on:click={Upload}>data</button>

<Dropzone on:drop={handleFilesSelect} />
